"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"

// Mock data for members
const members = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Member ${i + 1}`,
    address: `${i + 1} Main St, City ${i + 1}, Country`,
    email: `member${i + 1}@example.com`,
    phoneNumbers: [
        { type: "Mobile", number: `+1 555-000-${(i + 1).toString().padStart(4, '0')}` },
        { type: "Landline", number: `+1 555-111-${(i + 1).toString().padStart(4, '0')}` },
    ],
    dateOfBirth: new Date(1970 + i, i % 12, (i % 28) + 1).toISOString(),
    avatar: `/avatars/member-${i + 1}.png`,
}))

export default function MemberList() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 15
    const totalPages = Math.ceil(members.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentMembers = members.slice(startIndex, endIndex)

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Member List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Numbers</TableHead>
                                <TableHead>Date of Birth</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={member.avatar} alt={member.name} />
                                                <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span>{member.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.address}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>
                                        {member.phoneNumbers.map((phone, index) => (
                                            <div key={index}>
                                                <span className="font-semibold">{phone.type}:</span> {phone.number}
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>{formatDate(member.dateOfBirth)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

