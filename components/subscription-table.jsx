"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, RefreshCw } from "lucide-react"
import Link from "next/link"

export function SubscriptionTable({ status }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, you would fetch this from your API
  const subscriptions = [
    {
      id: "SUB-001",
      user: "John Doe",
      userId: "user-001",
      email: "john@example.com",
      area: "Downtown Station",
      areaId: "area-001",
      startDate: "2023-10-15",
      endDate: "2023-11-15",
      status: "active",
      daysLeft: 12,
    },
    {
      id: "SUB-002",
      user: "Jane Smith",
      userId: "user-002",
      email: "jane@example.com",
      area: "Westside Hub",
      areaId: "area-002",
      startDate: "2023-09-20",
      endDate: "2023-10-20",
      status: "expiring",
      daysLeft: 2,
    },
    {
      id: "SUB-003",
      user: "Bob Johnson",
      userId: "user-003",
      email: "bob@example.com",
      area: "North Terminal",
      areaId: "area-003",
      startDate: "2023-08-05",
      endDate: "2023-09-05",
      status: "expired",
      daysLeft: 0,
    },
    {
      id: "SUB-004",
      user: "Alice Brown",
      userId: "user-004",
      email: "alice@example.com",
      area: "East Station",
      areaId: "area-004",
      startDate: "2023-07-10",
      endDate: "2023-08-10",
      status: "revoked",
      daysLeft: 0,
    },
    {
      id: "SUB-005",
      user: "Charlie Wilson",
      userId: "user-005",
      email: "charlie@example.com",
      area: "Downtown Station",
      areaId: "area-001",
      startDate: "2023-10-01",
      endDate: "2023-11-01",
      status: "active",
      daysLeft: 8,
    },
  ].filter((sub) => sub.status === status)

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status, daysLeft) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "expiring":
        return <Badge className="bg-yellow-500">Expiring in {daysLeft} days</Badge>
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>
      case "revoked":
        return <Badge variant="outline">Revoked</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subscription ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Service Area</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{subscription.user}</div>
                      <div className="text-sm text-muted-foreground">{subscription.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/service-areas/${subscription.areaId}`} className="text-primary hover:underline">
                      {subscription.area}
                    </Link>
                  </TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.endDate}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status, subscription.daysLeft)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/subscribers/${subscription.userId}`}>View Subscriber</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/service-areas/${subscription.areaId}`}>View Service Area</Link>
                        </DropdownMenuItem>
                        {subscription.status === "expired" && <DropdownMenuItem>Revoke Password</DropdownMenuItem>}
                        {subscription.status === "active" && <DropdownMenuItem>Extend Subscription</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No subscriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
