import { createClient } from '@/utils/supabase/server';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const { method } = req;

    if (method === 'PROPFIND') {
        return handlePropfind(req);
    } else if (method === 'REPORT') {
        return handleReport(req);
    } else if (method === 'GET') {
        return handlePropfind(req);
    } else {
        return new Response(`Method ${method} Not Allowed`, {
            status: 405,
            headers: { Allow: 'PROPFIND, REPORT' },
        });
    }
};

const handlePropfind = async (req: NextRequest) => {
    const supabase = createClient();
    // Extract user session or credentials
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        });
    }

    // Fetch contacts from Supabase
    const { data: mitglieder, error: mitgliederError } = await supabase
        .from('mitglieder')
        .select('*');

    if (mitgliederError) {
        return new Response(JSON.stringify({ error: 'Failed to fetch contacts' }), {
            status: 500,
        });
    }

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
    let vCards = contacts.map((contact) => `
        BEGIN:VCARD
        VERSION:3.0
        FN:${contact.vorname} ${contact.nachname}
        EMAIL:${contact.email}
        END:VCARD
  `);

    return vCards.join('\n');
};