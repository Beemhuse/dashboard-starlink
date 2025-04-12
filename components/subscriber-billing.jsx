"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubscriberBilling({ subscriberId }) {
  // Mock data - in a real app, you would fetch this from your API
  // Different users have different billing history
  const allBillingHistory = {
    "user-001": [
      {
        id: "INV-001",
        date: "2023-10-15",
        amount: 50,
        description: "1 Month Subscription - Downtown Station",
        status: "paid",
      },
      {
        id: "INV-002",
        date: "2023-09-15",
        amount: 50,
        description: "1 Month Subscription - Downtown Station",
        status: "paid",
      },
      {
        id: "INV-003",
        date: "2023-08-15",
        amount: 50,
        description: "1 Month Subscription - Downtown Station",
        status: "paid",
      },
    ],
    "user-005": [
      {
        id: "INV-005",
        date: "2023-10-01",
        amount: 50,
        description: "1 Month Subscription - Downtown Station",
        status: "paid",
      },
    ],
  }

  const billingHistory = allBillingHistory[subscriberId] || []

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Billing History</h3>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingHistory.length > 0 ? (
              billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No billing history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
