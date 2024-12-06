"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
    { month: "Jan", drives: 15 },
    { month: "Feb", drives: 18 },
    { month: "Mar", drives: 20 },
    { month: "Apr", drives: 15 },
    { month: "May", drives: 20 },
]

export default function EmergencyDriveStats() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emergency Drives</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data[data.length - 1]?.drives}</div>
                <p className="text-xs text-muted-foreground">
                    {/* +{data[data.length - 1].drives - data[data.length - 2]?.drives} from last month */}
                </p>
                <div className="mt-4 h-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="drives"
                                stroke="hsl(var(--primary))"
                                fill="url(#gradient)"
                                strokeWidth={2}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid gap-0.5">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">MONTH</span>
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">DRIVES</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="font-bold">{payload[0]?.payload.month}</span>
                                                        <span className="font-bold">{payload[0]?.payload.drives}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

