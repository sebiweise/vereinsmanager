import { Mitglied, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server';

async function getData(): Promise<Mitglied[]> {
    const supabase = createClient();
    const { data: mitglieder } = await supabase.from("mitglieder").select();

    return mitglieder || [];
}

export default async function MitgliederPage() {
    const data = await getData()

    return (
        <DataTable columns={columns} data={data} />
    )
}