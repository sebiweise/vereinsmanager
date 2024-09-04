import { Tables } from "@/types/database.types";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/lib/supabase/server';

async function getData(): Promise<Tables<'mitglieder'>[]> {
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
