import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
    {
        id: 1,
        type: "Emergency Drive",
        description: "Responded to a house fire on Main Street",
        date: "2023-05-10",
    },
    {
        id: 2,
        type: "Training",
        description: "Conducted water rescue training at City Lake",
        date: "2023-05-08",
    },
    {
        id: 3,
        type: "Community Event",
        description: "Participated in the annual Fire Safety Awareness Day",
        date: "2023-05-05",
    },
]

export default function RecentActivities() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
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
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M12 11h4" />
                    <path d="M12 16h4" />
                    <path d="M8 11h.01" />
                    <path d="M8 16h.01" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.type}</p>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

