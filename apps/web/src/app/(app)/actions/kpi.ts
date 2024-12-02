"use server";

import { helperDateRange } from "@/lib/utils";
import { Prisma } from "db";

function helperAge(age: string) {
    const [rawStartAge, rawEndAge] = age.split("-");
    const startAge = rawStartAge ? Number(rawStartAge) : NaN;
    const endAge = rawEndAge ? Number(rawEndAge) : NaN;

    if (!isNaN(startAge) && !isNaN(endAge)) {
        return { startAge, endAge };
    }
    return { startAge: 0, endAge: 100 };
}

function formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export async function fetchAlarmData(
    year: string | null,
    range: string | null,
    select: string
): Promise<Prisma.AlarmGetPayload<{}>[]> {
    const supabase: any = null;

    let query = supabase
        .from("alarme")
        .select(`${select}, einsatznummer`)
        .order("einsatznummer", { ascending: false });

    if (year !== null || range != null) {
        // Parse the year or range
        const { startDate, endDate } = helperDateRange(year, range);

        query.gte("datum", startDate.toUTCString());
        query.lte("datum", endDate.toUTCString());
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching alarm data:", error);
        throw error;
    }

    return data as unknown as Prisma.AlarmGetPayload<{}>[];
}

export async function fetchMitgliederData(
    age: string | null,
): Promise<Prisma.MitgliedGetPayload<{}>[]> {
    const supabase: any = null;

    let query = supabase.from("mitglieder").select("*");

    if (age) {
        // Parse the age range
        const { startAge, endAge } = helperAge(age);
        query.gte("geburtsdatum", startAge);
        query.lte("geburtsdatum", endAge);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching mitglieder data:", error);
        throw error;
    }

    return data as unknown as Prisma.MitgliedGetPayload<{}>[];
}

// export async function fetchRevenueData(
//     month: string = "all",
//     audience?: string | null,
//     contentType?: string | null,
//     satisfaction?: string | null,
//     location?: string | null,
//     age?: string | null,
//     platform?: string | null,
//     campaignId?: string | null
// ): Promise<{ CampaignMonth: string; Revenue: string }[]> {
//     let query = `
//     WITH filtered_campaigns AS (
//       SELECT DISTINCT "CampaignID"
//       FROM subscriber_aggregated_data
//       WHERE 1 = 1
//   `;

//     const conditions = [];

//     if (audience) {
//         conditions.push(`"AudienceType" = '${audience}'`);
//     }

//     if (contentType) {
//         conditions.push(`"ContentType" = '${contentType}'`);
//     }

//     if (satisfaction) {
//         conditions.push(`"Satisfaction" = '${satisfaction}'`);
//     }

//     if (location) {
//         conditions.push(`"Location" = '${location}'`);
//     }

//     if (platform) {
//         conditions.push(`"Platform" = '${platform}'`);
//     }

//     if (campaignId) {
//         conditions.push(`"CampaignID" = '${campaignId}'`);
//     }

//     if (age) {
//         const { startAge, endAge } = helperAge(age);
//         conditions.push(`"Age" BETWEEN ${startAge} AND ${endAge}`);
//     }

//     if (month && month !== "all") {
//         conditions.push(`"CampaignMonth" = '${month.slice(0, 3)}'`);
//     }

//     if (conditions.length > 0) {
//         query += `
//       AND ${conditions.join(" AND ")}
//     `;
//     }

//     query += `
//     )
//     SELECT
//       TO_CHAR(DATE_TRUNC('month', TO_DATE("StartDate", 'DD.MM.YYYY')), 'Mon') AS "CampaignMonth",
//       SUM("Revenue") AS "Revenue"
//     FROM campaign
//     WHERE "CampaignID" IN (SELECT "CampaignID" FROM filtered_campaigns)
//     group by "CampaignMonth";
//   `;
//     const result = await runQuery(query);
//     revalidatePath("/dashboard");
//     return result.data as { CampaignMonth: string; Revenue: string }[];
// }

// export async function fetchBudgetData(
//     month: string = "all",
//     audience?: string | null,
//     contentType?: string | null,
//     satisfaction?: string | null,
//     location?: string | null,
//     age?: string | null,
//     platform?: string | null,
//     campaignId?: string | null
// ): Promise<{ CampaignMonth: string; Budget: string }[]> {
//     let query = `
//     WITH filtered_campaigns AS (
//       SELECT DISTINCT "CampaignID"
//       FROM subscriber_aggregated_data
//       WHERE 1 = 1
//   `;

//     const conditions = [];

//     if (audience) {
//         conditions.push(`"AudienceType" = '${audience}'`);
//     }

//     if (contentType) {
//         conditions.push(`"ContentType" = '${contentType}'`);
//     }

//     if (satisfaction) {
//         conditions.push(`"Satisfaction" = '${satisfaction}'`);
//     }

//     if (location) {
//         conditions.push(`"Location" = '${location}'`);
//     }

//     if (age) {
//         const { startAge, endAge } = helperAge(age);
//         conditions.push(`"Age" BETWEEN ${startAge} AND ${endAge}`);
//     }
//     if (platform) {
//         conditions.push(`"Platform" = '${platform}'`);
//     }
//     if (campaignId) {
//         conditions.push(`"CampaignID" = '${campaignId}'`);
//     }

//     if (month && month !== "all") {
//         conditions.push(`"CampaignMonth" = '${month.slice(0, 3)}'`);
//     }
//     if (conditions.length > 0) {
//         query += `
//       AND ${conditions.join(" AND ")}
//     `;
//     }

//     query += `
//     )
//     SELECT
//       TO_CHAR(DATE_TRUNC('month', TO_DATE("StartDate", 'DD.MM.YYYY')), 'Mon') AS "CampaignMonth",
//       SUM("Budget") AS "Budget"
//     FROM campaign
//     WHERE "CampaignID" IN (SELECT "CampaignID" FROM filtered_campaigns)
//     group by "CampaignMonth";
//   `;

//     const result = await runQuery(query);

//     revalidatePath("/dashboard");
//     return result.data as { CampaignMonth: string; Budget: string }[];
// }

// export async function fetchImpressionData(
//     month: string = "all",
//     audience?: string | null,
//     contentType?: string | null,
//     satisfaction?: string | null,
//     location?: string | null,
//     age?: string | null,
//     platform?: string | null,
//     campaignId?: string | null
// ): Promise<{ CampaignMonth: string; Impressions: string }[]> {
//     let query = `
//     WITH filtered_campaigns AS (
//       SELECT DISTINCT "CampaignID"
//       FROM subscriber_aggregated_data
//       WHERE 1 = 1
//   `;

//     const conditions = [];

//     if (audience) {
//         conditions.push(`"AudienceType" = '${audience}'`);
//     }

//     if (contentType) {
//         conditions.push(`"ContentType" = '${contentType}'`);
//     }

//     if (satisfaction) {
//         conditions.push(`"Satisfaction" = '${satisfaction}'`);
//     }

//     if (location) {
//         conditions.push(`"Location" = '${location}'`);
//     }

//     if (age) {
//         const { startAge, endAge } = helperAge(age);
//         conditions.push(`"Age" BETWEEN ${startAge} AND ${endAge}`);
//     }
//     if (platform) {
//         conditions.push(`"Platform" = '${platform}'`);
//     }
//     if (campaignId) {
//         conditions.push(`"CampaignID" = '${campaignId}'`);
//     }

//     if (month && month !== "all") {
//         conditions.push(`"CampaignMonth" = '${month.slice(0, 3)}'`);
//     }
//     if (conditions.length > 0) {
//         query += `
//       AND ${conditions.join(" AND ")}
//     `;
//     }

//     query += `
//     )
//     SELECT
//       TO_CHAR(DATE_TRUNC('month', TO_DATE("StartDate", 'DD.MM.YYYY')), 'Mon') AS "CampaignMonth",
//       SUM("Impressions") AS "Impressions"
//     FROM campaign
//     WHERE "CampaignID" IN (SELECT "CampaignID" FROM filtered_campaigns)
//     group by "CampaignMonth";
//   `;

//     const result = await runQuery(query);

//     revalidatePath("/dashboard");
//     return result.data as { CampaignMonth: string; Impressions: string }[];
// }

// export async function fetchClicksData(
//     month: string = "all",
//     audience?: string | null,
//     contentType?: string | null,
//     satisfaction?: string | null,
//     location?: string | null,
//     age?: string | null,
//     platform?: string | null,
//     campaignId?: string | null
// ): Promise<{ CampaignMonth: string; Clicks: string }[]> {
//     let query = `
//     WITH filtered_campaigns AS (
//       SELECT DISTINCT "CampaignID"
//       FROM subscriber_aggregated_data
//       WHERE 1 = 1
//   `;

//     const conditions = [];

//     if (audience) {
//         conditions.push(`"AudienceType" = '${audience}'`);
//     }

//     if (contentType) {
//         conditions.push(`"ContentType" = '${contentType}'`);
//     }

//     if (satisfaction) {
//         conditions.push(`"Satisfaction" = '${satisfaction}'`);
//     }

//     if (location) {
//         conditions.push(`"Location" = '${location}'`);
//     }

//     if (age) {
//         const { startAge, endAge } = helperAge(age);
//         conditions.push(`"Age" BETWEEN ${startAge} AND ${endAge}`);
//     }
//     if (platform) {
//         conditions.push(`"Platform" = '${platform}'`);
//     }
//     if (campaignId) {
//         conditions.push(`"CampaignID" = '${campaignId}'`);
//     }

//     if (month && month !== "all") {
//         conditions.push(`"CampaignMonth" = '${month.slice(0, 3)}'`);
//     }
//     if (conditions.length > 0) {
//         query += `
//       AND ${conditions.join(" AND ")}
//     `;
//     }

//     query += `
//     )
//     SELECT
//       TO_CHAR(DATE_TRUNC('month', TO_DATE("StartDate", 'DD.MM.YYYY')), 'Mon') AS "CampaignMonth",
//       SUM("Clicks") AS "Clicks"
//     FROM campaign
//     WHERE "CampaignID" IN (SELECT "CampaignID" FROM filtered_campaigns)
//     group by "CampaignMonth";
//   `;

//     const result = await runQuery(query);

//     revalidatePath("/dashboard");
//     return result.data as { CampaignMonth: string; Clicks: string }[];
// }

// export async function fetchSubsData(
//     month: string = "all",
//     audience?: string | null,
//     contentType?: string | null,
//     satisfaction?: string | null,
//     location?: string | null,
//     age?: string | null,
//     platform?: string | null,
//     campaignId?: string | null
// ): Promise<{ CampaignMonth: string; NewSubscriptions: string }[]> {
//     let query = `
//     WITH filtered_campaigns AS (
//       SELECT DISTINCT "CampaignID"
//       FROM subscriber_aggregated_data
//       WHERE 1 = 1
//   `;

//     const conditions = [];

//     if (audience) {
//         conditions.push(`"AudienceType" = '${audience}'`);
//     }

//     if (contentType) {
//         conditions.push(`"ContentType" = '${contentType}'`);
//     }

//     if (satisfaction) {
//         conditions.push(`"Satisfaction" = '${satisfaction}'`);
//     }

//     if (location) {
//         conditions.push(`"Location" = '${location}'`);
//     }

//     if (age) {
//         const { startAge, endAge } = helperAge(age);
//         conditions.push(`"Age" BETWEEN ${startAge} AND ${endAge}`);
//     }
//     if (platform) {
//         conditions.push(`"Platform" = '${platform}'`);
//     }
//     if (campaignId) {
//         conditions.push(`"CampaignID" = '${campaignId}'`);
//     }

//     if (month && month !== "all") {
//         conditions.push(`"CampaignMonth" = '${month.slice(0, 3)}'`);
//     }
//     if (conditions.length > 0) {
//         query += `
//       AND ${conditions.join(" AND ")}
//     `;
//     }

//     query += `
//     )
//     SELECT
//       TO_CHAR(DATE_TRUNC('month', TO_DATE("StartDate", 'DD.MM.YYYY')), 'Mon') AS "CampaignMonth",
//       SUM("NewSubscriptions") AS "NewSubscriptions"
//     FROM campaign
//     WHERE "CampaignID" IN (SELECT "CampaignID" FROM filtered_campaigns)
//     group by "CampaignMonth";
//   `;

//     const result = await runQuery(query);

//     revalidatePath("/dashboard");
//     return result.data as { CampaignMonth: string; NewSubscriptions: string }[];
// }