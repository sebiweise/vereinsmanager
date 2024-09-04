import { Tables } from "@/types/database.types";
import { Dashboard } from "./components/dashboard";
import { DateRangePicker } from "./components/date-range-picker";
import { fetchAlarmData, fetchMitgliederData } from "./actions/kpi";

async function getData({ year, range, age }: SearchParams): Promise<{ AlarmData: Tables<'alarme'>[]; MitgliederData: Tables<'mitglieder'>[] }> {
  const [
    AlarmData,
    MitgliederData,
  ] = await Promise.all([
    fetchAlarmData(
      year,
      range,
      "*"
    ),
    fetchMitgliederData(
      age,
    ),
  ]);

  return { AlarmData, MitgliederData };
}

export type SearchParams = {
  year: string | null;
  range: string | null;
  age: string | null;
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    year,
    range,
    age,
  } = searchParams;

  const { AlarmData } = await getData({
    year,
    range,
    age,
  });

  return (
    <div>
      <DateRangePicker />
      <Dashboard alarme={AlarmData} />
    </ div>
  )
}
