"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SubscriberSubscriptions({ subscriberId }) {
  // Mock data - in a real app, you would fetch this from your API
  // Different users have different subscriptions
  const allSubscriptions = {
    "user-001": [
      {
        id: "SUB-001",
        area: "Downtown Station",
        areaId: "area-001",
        password: "StarLink2023!",
        startDate: "2023-10-15",
        endDate: "2023-11-15",
        status: "active",
        daysLeft: 12,
      },
    ],
    "user-005": [
      {
        id: "SUB-005",
        area: "Downtown Station",
        areaId: "area-001",
        password: "SecureFi789!",
        startDate: "2023-10-01",
        endDate: "2023-11-01",
        status: "active",
        daysLeft: 8,
      },
    ],
  }

  const subscriptions = allSubscriptions[subscriberId] || []

  const getStatusBadge = (status, daysLeft) => {
    switch (status) {
      case "active":
        return daysLeft <= 3 ? (
          <Badge className="bg-yellow-500">Expiring in {daysLeft} days</Badge>
        ) : (
          <Badge className="bg-green-500">Active</Badge>
        )
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Active Subscriptions</h3>
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
              <TableHead>Service Area</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.id}</TableCell>
                  <TableCell>
                    <Link href={`/service-areas/${subscription.areaId}`} className="text-primary hover:underline">
                      {subscription.area}
                    </Link>
                  </TableCell>
                  <TableCell>••••••••••</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Extend Subscription</DropdownMenuItem>
                        <DropdownMenuItem>Change Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Revoke Access</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No active subscriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => (window.location.href = "/subscriptions/new?userId=" + subscriberId)}>
          Add New Subscription
        </Button>
      </div>
    </div>
  )
}
