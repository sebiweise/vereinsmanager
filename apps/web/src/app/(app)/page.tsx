import { Dashboard } from "./components/dashboard";
import { fetchAlarmData, fetchMitgliederData } from "./actions/kpi";
import { Prisma } from "db";

async function getData({ year, range, age }: SearchParams): Promise<{ AlarmData: Prisma.AlarmGetPayload<{}>[]; MitgliederData: Prisma.MitgliedGetPayload<{}>[] }> {
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

  // const { AlarmData } = await getData({
  //   year,
  //   range,
  //   age,
  // });

  return (
    <div>
      <Dashboard alarme={[]} />
    </ div>
  )
}
