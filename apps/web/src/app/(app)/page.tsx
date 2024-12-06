import { Metadata } from "next"
import MemberAgeChart from "@/components/dashboard/member-age-chart"
import BirthdayList from "@/components/dashboard/birthday-list"
import EmergencyDriveStats from "@/components/dashboard/emergency-drive-stats"
import RecentActivities from "@/components/dashboard/recent-activities"
import MemberList from "@/components/dashboard/member-list"

export const metadata: Metadata = {
  title: "Dashboard | Vereinsmanager",
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <EmergencyDriveStats />
        <BirthdayList />
        <RecentActivities />
        <MemberAgeChart />
      </div>
      <MemberList />
    </div>
  )
}

