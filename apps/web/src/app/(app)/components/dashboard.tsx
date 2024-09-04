"use client"

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Label,
    LabelList,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Tables } from "@/types/database.types"
import { DateRangePicker } from "./date-range-picker"

function calculateAverageStaerke(arr: Tables<'alarme'>[]): number {
    // If the array is empty, return 0 or handle it as needed
    if (arr.length === 0) return 0;

    // Sum up all the values
    const sum = arr.reduce((accumulator, current) => accumulator + (current.staerke || 0), 0);

    // Calculate the average
    const average = sum / arr.length;

    return Math.ceil(average);
}

function getAverageTime(objects: Tables<'alarme'>[]): Date | null {
    if (objects.length === 0) {
        return null; // Return null if the array is empty
    }

    const totalMilliseconds = objects.reduce((sum, obj) => sum + (new Date(obj.datum).getTime()), 0);
    const averageMilliseconds = totalMilliseconds / objects.length;
    const averageDate = new Date(averageMilliseconds);

    return averageDate;
}

interface MonthlyAverageStaerke {
    date: string;
    averageStaerke: number;
}
function getMonthlyAverageStaerke(data: Tables<'alarme'>[]): MonthlyAverageStaerke[] {
    const groupedData: { [key: string]: { totalStaerke: number; count: number } } = {};

    data.forEach(({ datum, staerke }) => {
        const date = new Date(datum);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month.toString().length == 1 ? "0" + month : month}-01`

        if (!groupedData[key]) {
            groupedData[key] = { totalStaerke: 0, count: 0 };
        }

        groupedData[key].totalStaerke += staerke || 0;
        groupedData[key].count += 1;
    });

    const monthlyAverages: MonthlyAverageStaerke[] = [];

    for (const key in groupedData) {
        const data = groupedData[key];

        if (data) {
            const { totalStaerke, count } = data;
            const averageStaerke = Math.ceil(totalStaerke / count);

            monthlyAverages.push({
                date: key,
                averageStaerke,
            });
        }
    }

    monthlyAverages.sort((a: MonthlyAverageStaerke, b: MonthlyAverageStaerke) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();

    });

    return monthlyAverages;
}

function calculateAverageEinsaetze(arr: Tables<'alarme'>[]): number {
    // If the array is empty, return 0 or handle it as needed
    if (arr.length === 0) return 0;

    const array = getMonthlyEinsaetze(arr);
    // Sum up all the values
    const sum = array.reduce((accumulator, current) => accumulator + current.einsaetze, 0);

    // Calculate the average
    const average = sum / array.length;

    return Math.ceil(average);
}
interface MonthlyEinsaetze {
    date: string;
    einsaetze: number;
}
function getMonthlyEinsaetze(data: Tables<'alarme'>[]): MonthlyEinsaetze[] {
    const groupedData: { [key: string]: { count: number } } = {};

    data.forEach(({ datum }) => {
        const date = new Date(datum);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month.toString().length == 1 ? "0" + month : month}-01`

        if (!groupedData[key]) {
            groupedData[key] = { count: 0 };
        }
        groupedData[key].count += 1;
    });

    const monthlyAverages: MonthlyEinsaetze[] = [];

    for (const key in groupedData) {
        const data = groupedData[key];

        if (data) {
            const { count } = data;

            monthlyAverages.push({
                date: key,
                einsaetze: count,
            });
        }
    }

    monthlyAverages.sort((a: MonthlyEinsaetze, b: MonthlyEinsaetze) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();

    });

    return monthlyAverages;
}

export function Dashboard({ alarme }: { alarme: Tables<'alarme'>[] }) {
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 space-y-8">
            <DateRangePicker />
            <div className="chart-wrapper flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                    <Card
                        className="lg:max-w-md" x-chunk="charts-01-chunk-0"
                    >
                        <CardHeader className="space-y-0 pb-2">
                            <CardDescription>Dieses Jahr</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">
                                {alarme.length}{" "}
                                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                    Einsätze
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    einsaetze: {
                                        label: "Einsätze",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                            >
                                <BarChart
                                    accessibilityLayer
                                    margin={{
                                        left: -4,
                                        right: -4,
                                    }}
                                    data={getMonthlyEinsaetze(alarme)}
                                >
                                    <Bar
                                        dataKey="einsaetze"
                                        fill="var(--color-einsaetze)"
                                        radius={5}
                                        fillOpacity={0.6}
                                        activeBar={<Rectangle fillOpacity={0.8} />}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={4}
                                        tickFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("de-DE", {
                                                month: "short",
                                            })
                                        }}
                                    />
                                    <ChartTooltip
                                        defaultIndex={2}
                                        content={
                                            <ChartTooltipContent
                                                hideIndicator
                                                labelFormatter={(value) => {
                                                    return new Date(value).toLocaleDateString("de-DE", {
                                                        month: "long",
                                                        year: "numeric",
                                                    })
                                                }}
                                            />
                                        }
                                        cursor={false}
                                    />
                                    <ReferenceLine
                                        y={calculateAverageEinsaetze(alarme)}
                                        stroke="hsl(var(--muted-foreground))"
                                        strokeDasharray="3 3"
                                        strokeWidth={1}
                                    >
                                        <Label
                                            position="insideBottomLeft"
                                            value="⌀ Einsätze pro Monat"
                                            offset={10}
                                            fill="hsl(var(--foreground))"
                                        />
                                        <Label
                                            position="insideTopLeft"
                                            value={calculateAverageEinsaetze(alarme)}
                                            className="text-lg"
                                            fill="hsl(var(--foreground))"
                                            offset={10}
                                            startOffset={100}
                                        />
                                    </ReferenceLine>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card
                        className="lg:max-w-md" x-chunk="charts-01-chunk-4"
                    >
                        <CardHeader>
                            <CardTitle>Einsatzstichwörter</CardTitle>
                            <CardDescription>
                                Eine Übersicht der 5 häufigsten Einsatzstichwörter.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-4 p-4 pb-2">
                            <ChartContainer
                                config={{
                                    move: {
                                        label: "Move",
                                        color: "hsl(var(--chart-1))",
                                    },
                                    stand: {
                                        label: "Stand",
                                        color: "hsl(var(--chart-2))",
                                    },
                                    exercise: {
                                        label: "Exercise",
                                        color: "hsl(var(--chart-3))",
                                    },
                                }}
                                className="h-[140px] w-full"
                            >
                                <BarChart
                                    margin={{
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 10,
                                    }}
                                    data={[
                                        {
                                            activity: "stand",
                                            value: (8 / 12) * 100,
                                            label: "8/12 hr",
                                            fill: "var(--color-stand)",
                                        },
                                        {
                                            activity: "exercise",
                                            value: (46 / 60) * 100,
                                            label: "46/60 min",
                                            fill: "var(--color-exercise)",
                                        },
                                        {
                                            activity: "move",
                                            value: (245 / 360) * 100,
                                            label: "245/360 kcal",
                                            fill: "var(--color-move)",
                                        },
                                        {
                                            activity: "move",
                                            value: (245 / 360) * 100,
                                            label: "245/360 kcal",
                                            fill: "var(--color-move)",
                                        },
                                        {
                                            activity: "move",
                                            value: (245 / 360) * 100,
                                            label: "245/360 kcal",
                                            fill: "var(--color-move)",
                                        },
                                    ]}
                                    layout="vertical"
                                    barSize={32}
                                    barGap={2}
                                >
                                    <XAxis type="number" dataKey="value" hide />
                                    <YAxis
                                        dataKey="activity"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={4}
                                        axisLine={false}
                                        className="capitalize"
                                    />
                                    <Bar dataKey="value" radius={5}>
                                        <LabelList
                                            position="insideLeft"
                                            dataKey="label"
                                            fill="white"
                                            offset={8}
                                            fontSize={12}
                                        />
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                    <Card
                        className="lg:max-w-md" x-chunk="charts-01-chunk-0"
                    >
                        <CardHeader className="space-y-0 pb-2">
                            <CardDescription>Personalaufwand</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">
                                {alarme.reduce((accumulator, current) => accumulator + (current.staerke || 0), 0)}{" "}
                                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                    Kameraden insgesammt
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    averageStaerke: {
                                        label: "⌀ Stärke",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                            >
                                <BarChart
                                    accessibilityLayer
                                    margin={{
                                        left: -4,
                                        right: -4,
                                    }}
                                    data={getMonthlyAverageStaerke(alarme)}
                                >
                                    <Bar
                                        dataKey="averageStaerke"
                                        fill="var(--color-averageStaerke)"
                                        radius={5}
                                        fillOpacity={0.6}
                                        activeBar={<Rectangle fillOpacity={0.8} />}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={4}
                                        tickFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("de-DE", {
                                                month: "short",
                                            })
                                        }}
                                    />
                                    <ChartTooltip
                                        defaultIndex={2}
                                        content={
                                            <ChartTooltipContent
                                                hideIndicator
                                                labelFormatter={(value) => {
                                                    return new Date(value).toLocaleDateString("de-DE", {
                                                        month: "long",
                                                        year: "numeric",
                                                    })
                                                }}
                                            />
                                        }
                                        cursor={false}
                                    />
                                    <ReferenceLine
                                        y={calculateAverageStaerke(alarme)}
                                        stroke="hsl(var(--muted-foreground))"
                                        strokeDasharray="3 3"
                                        strokeWidth={1}
                                    >
                                        <Label
                                            position="insideBottomLeft"
                                            value="⌀ Einsätze pro Monat"
                                            offset={10}
                                            fill="hsl(var(--foreground))"
                                        />
                                        <Label
                                            position="insideTopLeft"
                                            value={calculateAverageStaerke(alarme)}
                                            className="text-lg"
                                            fill="hsl(var(--foreground))"
                                            offset={10}
                                            startOffset={100}
                                        />
                                    </ReferenceLine>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card
                        className="lg:max-w-md" x-chunk="charts-01-chunk-3"
                    >
                        <CardHeader className="p-4 pb-0">
                            <CardTitle>Personalaufwand</CardTitle>
                            <CardDescription>
                                Gesamter Personalaufwand (Kameraden)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                                {alarme.reduce((accumulator, current) => accumulator + (current.staerke || 0), 0)}
                                <span className="text-sm font-normal text-muted-foreground">
                                    Kameraden
                                </span>
                            </div>
                            <ChartContainer
                                config={{
                                    averageStaerke: {
                                        label: "⌀ Stärke",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                                className="ml-auto w-[72px]"
                            >
                                <BarChart
                                    accessibilityLayer
                                    margin={{
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                    }}
                                    data={getMonthlyAverageStaerke(alarme)}
                                >
                                    <Bar
                                        dataKey="averageStaerke"
                                        fill="var(--color-averageStaerke)"
                                        radius={2}
                                        fillOpacity={0.2}
                                        activeIndex={6}
                                        activeBar={<Rectangle fillOpacity={0.8} />}
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={4}
                                        hide
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid w-full flex-1 gap-6">
                    <Card
                        className="max-w-xs" x-chunk="charts-01-chunk-7"
                    >
                        <CardHeader className="space-y-0 pb-0">
                            <CardDescription>⌀ Einsatzzeit</CardDescription>
                            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                                {getAverageTime(alarme)?.toLocaleTimeString("de-DE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                                    Uhr
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ChartContainer
                                config={{
                                    time: {
                                        label: "Time",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                            >
                                <AreaChart
                                    accessibilityLayer
                                    data={[
                                        {
                                            date: "2024-01-01",
                                            time: 8.5,
                                        },
                                        {
                                            date: "2024-01-02",
                                            time: 7.2,
                                        },
                                        {
                                            date: "2024-01-03",
                                            time: 8.1,
                                        },
                                        {
                                            date: "2024-01-04",
                                            time: 6.2,
                                        },
                                        {
                                            date: "2024-01-05",
                                            time: 5.2,
                                        },
                                        {
                                            date: "2024-01-06",
                                            time: 8.1,
                                        },
                                        {
                                            date: "2024-01-07",
                                            time: 7.0,
                                        },
                                    ]}
                                    margin={{
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis dataKey="date" hide />
                                    <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                                    <defs>
                                        <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="var(--color-time)"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--color-time)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="time"
                                        type="natural"
                                        fill="url(#fillTime)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-time)"
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                        formatter={(value) => (
                                            <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                                                ⌀ Einsatzzeit
                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                    {value}
                                                    <span className="font-normal text-muted-foreground">
                                                        Uhr
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
