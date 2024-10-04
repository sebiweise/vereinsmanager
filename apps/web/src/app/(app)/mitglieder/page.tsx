import { Prisma } from "db";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getData(): Promise<Prisma.MitgliedGetPayload<{}>[]> {
    const mitglieder = await db.mitglied.findMany();

    return mitglieder;
}

export default async function MitgliederPage() {
    const data = await getData()

    return (
        <DataTable columns={columns} data={data} />
    )
}
