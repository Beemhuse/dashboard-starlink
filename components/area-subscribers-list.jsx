"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AreaSubscribersList({ areaId }) {
  // Mock data - in a real app, you would fetch this from your API
  const subscribers = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@example.com",
      startDate: "2023-10-15",
      endDate: "2023-11-15",
      status: "active",
      daysLeft: 12,
    },
    {
      id: "user-005",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      startDate: "2023-10-01",
      endDate: "2023-11-01",
      status: "active",
      daysLeft: 8,
    },
    {
      id: "user-008",
      name: "Emma Johnson",
      email: "emma@example.com",
      startDate: "2023-09-25",
      endDate: "2023-10-25",
      status: "active",
      daysLeft: 1,
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.length > 0 ? (
            subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.startDate}</TableCell>
                <TableCell>{subscriber.endDate}</TableCell>
                <TableCell>
                  {subscriber.daysLeft <= 3 ? (
                    <Badge className="bg-yellow-500">Expiring in {subscriber.daysLeft} days</Badge>
                  ) : (
                    <Badge className="bg-green-500">Active</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/subscribers/${subscriber.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No active subscribers for this area.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
