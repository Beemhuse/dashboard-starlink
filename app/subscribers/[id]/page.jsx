import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Mail, Phone, Calendar, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SubscriberSubscriptions } from "@/components/subscriber-subscriptions"
import { SubscriberBilling } from "@/components/subscriber-billing"

// This would normally come from your database
const getSubscriber = (id) => {
  const subscribers = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-05-15",
      subscriptions: 1,
      totalSpent: 50,
      status: "active",
    },
    {
      id: "user-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      joinDate: "2023-04-10",
      subscriptions: 2,
      totalSpent: 100,
      status: "active",
    },
    {
      id: "user-003",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2023-03-22",
      subscriptions: 0,
      totalSpent: 75,
      status: "inactive",
    },
    {
      id: "user-004",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-04-05",
      subscriptions: 1,
      totalSpent: 50,
      status: "inactive",
    },
    {
      id: "user-005",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      phone: "+1 (555) 876-5432",
      joinDate: "2023-06-12",
      subscriptions: 1,
      totalSpent: 50,
      status: "active",
    },
  ]

  const subscriber = subscribers.find((sub) => sub.id === id)
  if (!subscriber) return null
  return subscriber
}

export default async function SubscriberDetailsPage({ params }) {
  const subscriber = getSubscriber(params.id)

  if (!subscriber) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/subscribers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{subscriber.name}</h2>
        {subscriber.status === "active" ? (
          <Badge className="bg-green-500">Active</Badge>
        ) : (
          <Badge variant="outline">Inactive</Badge>
        )}
        <div className="ml-auto">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{subscriber.email}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phone</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{subscriber.phone}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Join Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{subscriber.joinDate}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${subscriber.totalSpent}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="subscriptions" className="space-y-4">
          <SubscriberSubscriptions subscriberId={params.id} />
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <SubscriberBilling subscriberId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
