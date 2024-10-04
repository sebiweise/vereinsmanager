import { Prisma } from "db";
import { type NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
    const { method } = req;

    if (method === 'PROPFIND') {
        return handlePropfind(req);
    } else if (method === 'REPORT') {
        return handleReport(req);
    } else {
        return new Response(`Method ${method} Not Allowed`, {
            status: 405,
            headers: { Allow: 'PROPFIND, REPORT' },
        });
    }
};

export const POST = async (req: NextRequest) => {
    const { method } = req;

    if (method === 'POST') {
        return handleExportContacts(req);
    } else {
        return new Response(`Method ${method} Not Allowed`, {
            status: 405,
            headers: { Allow: 'POST' },
        });
    }
};

const handleExportContacts = async (req: NextRequest) => {
    try {
        // Parse request body to get list of IDs
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid IDs provided' }), {
                status: 400,
            });
        }

        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Fetch contacts with matching IDs
        const mitglieder = await db.mitglied.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        const vCardData = convertToVCard(mitglieder);
        return new Response(vCardData, {
            status: 200,
            headers: { 'Content-Type': 'text/vcard' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to process request' }), {
            status: 500,
        });
    }
};

const handlePropfind = async (req: NextRequest) => {
    // Extract user session or credentials
    const { userId } = auth();

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    // Fetch contacts
    const mitglieder = await db.mitglied.findMany();

    // Respond with the formatted vCard data
    const vCardData = convertToVCard(mitglieder);
    return new Response(vCardData, {
        status: 200,
        headers: { 'Content-Type': 'text/vcard' },
    });
};

const handleReport = async (req: NextRequest) => {
    // Similar implementation for handling REPORT requests
    // Return a dummy response for the sake of this example
    return new Response('REPORT is under development', { status: 501 });
};

const convertToVCard = (contacts: any[]) => {
    // Convert your contacts data to vCard format
    let vCards = contacts.map((contact) => {
        let vCard: string = "BEGIN:VCARD\nVERSION:3\n";
        vCard += `FN;CHARSET=UTF-8:${contact.vorname} ${contact.nachname}\n`
        vCard += `N;CHARSET=UTF-8:${contact.nachname};${contact.vorname};;;\n`
        vCard += `BDAY:${formatDateToYYYYMMDD(new Date(contact.geburtsdatum))}\n`
        vCard += `TEL;TYPE=CELL:${contact.telefon_mobil}\n`
        if (contact.telefon_festnetz)
            vCard += `TEL;TYPE=HOME,VOICE:${contact.telefon_festnetz}\n`
        vCard += `ADR;CHARSET=UTF-8;TYPE=HOME:;;${contact.straße};${contact.stadt};;${contact.postleitzahl};\n`
        if (contact.rolle)
            vCard += `TITLE;CHARSET=UTF-8:${contact.rolle}\n`
        vCard += `ORG;CHARSET=UTF-8:Löschgruppe 3\n`
        vCard += "END:VCARD"

        return vCard;
    });

    return vCards.join("\n");
};

function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();

    // getMonth() returns month from 0 to 11, so we add 1 and pad with zeros if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    // getDate() returns the day of the month, pad with zeros if necessary
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
}

const formatAddress = (address: string) => {
    if (!address) return '';
    // Assuming address is a string or can be easily formatted
    return `ADR;TYPE=HOME:${address.replace(/\n/g, ';')}`;
};

const formatBirthday = (dob: Date) => {
    if (!dob) return '';
    // Assuming dob is in YYYY-MM-DD format
    return `BDAY:${dob}`;
};