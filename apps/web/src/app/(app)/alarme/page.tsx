import { Tables } from "@/types/database.types";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/lib/supabase/server';

async function getData(): Promise<Tables<'alarme'>[]> {
    const supabase = createClient();
    const { data: alarme } = await supabase.from("alarme").select();

    return alarme || [];
}

export default async function AlarmePage() {
    const data = await getData()

    return (
        <DataTable columns={columns} data={data} />
    )
}
