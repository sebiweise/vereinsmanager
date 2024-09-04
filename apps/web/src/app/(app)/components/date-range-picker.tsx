"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn, formatToDateRange, helperDateRange } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(`${previousYear}-01-01`),
        to: new Date(`${previousYear}-12-31`),
    })
    const [dateRangeString, setDateRangeString] = useState<string>(
        `01.01.${previousYear}-31.12.${previousYear}`
    )

    useEffect(() => {
        const range = searchParams.get("range");

        if (range && range != dateRangeString) {
            const { startDate, endDate } = helperDateRange(null, range);

            const newDateRange = { from: startDate, to: endDate };
            const newRange = formatToDateRange(newDateRange);

            setDateRange(newDateRange)
            setDateRangeString(newRange);
        }
    }, [searchParams, dateRangeString])

    const hanldeSelection = (newDateRange: DateRange | undefined) => {
        if (newDateRange) {
            const range = formatToDateRange(newDateRange);

            setDateRange(newDateRange)
            setDateRangeString(range);

            const params = new URLSearchParams();
            params.set("range", range);
            router.push(`${pathname}?${params.toString()}`);
        }
    }

    const hanldeYearSelection = (year: number) => {
        const newDateRange = {
            from: new Date(`${year}-01-01`),
            to: new Date(`${year}-12-31`),
        };
        const newRange = formatToDateRange(newDateRange);

        setDateRange(newDateRange)
        setDateRangeString(newRange);

        const params = new URLSearchParams();
        params.set("range", newRange);
        router.push(`${pathname}?${params.toString()}`);
    }

    const hanldeClearSelection = () => {
        setDateRange(undefined);
        setDateRangeString("");
        router.push(pathname);
    }

    return (
        <>
            <div className={cn("grid gap-2", className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !dateRange && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "LLL dd, y")} -{" "}
                                        {format(dateRange.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(dateRange.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Select
                            onValueChange={(value) =>
                                hanldeYearSelection(parseInt(value))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Schnellauswahl" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value={currentYear.toString()}>Dieses Jahr</SelectItem>
                                <SelectItem value={previousYear.toString()}>Letztes Jahr</SelectItem>
                            </SelectContent>
                        </Select>
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={(dateRange) => hanldeSelection(dateRange)}
                            numberOfMonths={2}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}
