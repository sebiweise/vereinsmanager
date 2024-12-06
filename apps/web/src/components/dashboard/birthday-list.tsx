import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

const birthdays = [
    { name: "John Doe", date: new Date(2023, 4, 15), age: 32, initials: "JD" },
    { name: "Jane Smith", date: new Date(2023, 4, 20), age: 28, initials: "JS" },
    { name: "Mike Johnson", date: new Date(2023, 5, 5), age: 45, initials: "MJ" },
]

export default function BirthdayList() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Birthdays</CardTitle>
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {birthdays.map((birthday) => (
                        <div key={birthday.name} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`/avatars/${birthday.name.toLowerCase().replace(' ', '-')}.png`} alt={birthday.name} />
                                <AvatarFallback>{birthday.initials}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{birthday.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(birthday.date, true)} (Turning {birthday.age})
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

