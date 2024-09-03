import { Tables } from "@/types/database.types";
import { createClient } from '@/utils/supabase/server';
import { Dashboard } from "./components/dashboard";
import { DateRangePicker } from "./components/date-range-picker";

async function getData({ startDate, endDate }: { startDate: Date, endDate: Date }): Promise<Tables<'alarme'>[]> {
  const supabase = createClient();
  const { data: alarme, error } = await supabase
    .from("alarme")
    .select()
    .lte("datum", endDate.toISOString())
    .gte("datum", startDate.toISOString());

  if (error)
    console.error(error)

  return alarme || [];
}

export default async function IndexPage() {
  var startDate = new Date("2023-01-01");
  var endDate = new Date("2023-12-31");

  const data = await getData({
    startDate,
    endDate
  })

  return (
    <div>
      <DateRangePicker />
      <Dashboard alarme={data} />
    </ div>
  )
}
