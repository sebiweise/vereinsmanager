"use server";

import { format } from "date-fns";
import {
    fetchMitgliederData,
} from "./kpi";
import { Prisma } from "db";

interface MitgliederOverTimeData {
    Month: string;
    NewMitglieder: number;
}
function groupMitgliederByMonth(mitgliederData: Prisma.MitgliedGetPayload<{}>[]): {
    [month: string]: number;
} {
    const result: { [monthKey: string]: number } = {};

    mitgliederData.forEach((mitglied) => {
        const createdDate = new Date(mitglied.created_at);
        const formattedMonth = format(createdDate, "yyyy-MM");

        if (!result[formattedMonth]) {
            result[formattedMonth] = 0;
        }
        // Increment subscriber count for the month
        result[formattedMonth]++;
    });

    return result;
}

export async function fetchSubscriptionsOverTime(): Promise<MitgliederOverTimeData[]> {
    const mitgliederData = await fetchMitgliederData(null);

    const mitgliederByMonth = groupMitgliederByMonth(mitgliederData);

    // Get all unique months from the subscriber data
    const allMonths = Array.from(
        new Set(
            mitgliederData.map((mitglied) =>
                format(new Date(mitglied.created_at), "yyyy-MM")
            )
        )
    ).sort();

    // Calculate new mitglieder for each month
    const mitgliederOverTime: MitgliederOverTimeData[] = allMonths.map(
        (month) => ({
            Month: month,
            NewMitglieder: mitgliederByMonth[month] || 0,
        })
    );

    return mitgliederOverTime;
}

interface GrowthRateOverTimeData {
    Month: string;
    GrowthRate: number;
}

export async function calculateGrowthRateForChart(
    monthlyMitglieder: MitgliederOverTimeData[]
): Promise<GrowthRateOverTimeData[]> {
    let growthData: GrowthRateOverTimeData[] = monthlyMitglieder.map(
        (data, index) => {
            if (index === 0) {
                return { Month: data.Month, GrowthRate: 0 }; // Initial month has no growth rate
            }
            const prevMitglieder =
                monthlyMitglieder[index - 1]?.NewMitglieder || 0;
            const currentMitglieder = data.NewMitglieder;
            const growthRate =
                prevMitglieder === 0
                    ? 0
                    : ((currentMitglieder - prevMitglieder) / prevMitglieder) *
                    100;
            return {
                Month: data.Month,
                GrowthRate: parseFloat(growthRate.toFixed(2)),
            }; // Round to 2 decimal places
        }
    );
    return growthData;
}

// export async function GoodOverBadCampaign() {
//     const result = await runQuery(GoodOverBadquery);
//     return result;
// }