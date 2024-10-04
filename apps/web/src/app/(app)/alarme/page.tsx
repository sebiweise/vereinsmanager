import { Prisma } from "db";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getData(): Promise<Prisma.AlarmGetPayload<{}>[]> {
    const alarme = await db.alarm.findMany();

    return alarme;
}

export default async function AlarmePage() {
    const data = await getData()

    return (
        <DataTable columns={columns} data={data} />
    )
}
