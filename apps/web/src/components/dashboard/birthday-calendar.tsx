"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function BirthdayCalendar() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Birthday Calendar</CardTitle>
                <CardDescription>Upcoming member birthdays</CardDescription>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
    )
}

