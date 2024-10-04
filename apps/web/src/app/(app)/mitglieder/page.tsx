import { Prisma } from "db";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getData(): Promise<Prisma.MitgliedGetPayload<{ include: { telefon: { include: { tag: true } } } }>[]> {
    const mitglieder = await db.mitglied.findMany({
        include: {
            telefon: {
                include: {
                    tag: true
                }
            }
        }
    });

    return mitglieder;
}

export default async function MitgliederPage() {
    const data = await getData()

    return (
        <DataTable columns={columns} data={data} />
    )
}
