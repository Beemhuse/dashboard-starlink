"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Search, MoreHorizontal } from "lucide-react"

export function SubscribersList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, you would fetch this from your API
  const subscribers = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      subscriptions: 1,
      totalSpent: 50,
      status: "active",
    },
    {
      id: "user-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      subscriptions: 2,
      totalSpent: 100,
      status: "active",
    },
    {
      id: "user-003",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 (555) 456-7890",
      subscriptions: 0,
      totalSpent: 75,
      status: "inactive",
    },
    {
      id: "user-004",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "+1 (555) 234-5678",
      subscriptions: 1,
      totalSpent: 50,
      status: "active",
    },
    {
      id: "user-005",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phone: "+1 (555) 876-5432",
      subscriptions: 3,
      totalSpent: 150,
      status: "active",
    },
  ]

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phone.includes(searchQuery),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search subscribers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Active Subscriptions</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">
                    <Link href={`/subscribers/${subscriber.id}`} className="text-primary hover:underline">
                      {subscriber.name}
                    </Link>
                  </TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>{subscriber.phone}</TableCell>
                  <TableCell>{subscriber.subscriptions}</TableCell>
                  <TableCell>${subscriber.totalSpent}</TableCell>
                  <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
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
                          <Link href={`/subscribers/${subscriber.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/subscribers/${subscriber.id}?tab=subscriptions`}>View Subscriptions</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>Edit Subscriber</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No subscribers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
