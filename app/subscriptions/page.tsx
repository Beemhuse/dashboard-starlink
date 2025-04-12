import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionTable } from "@/components/subscription-table"

export default function SubscriptionsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="revoked">Revoked</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <SubscriptionTable status="active" />
        </TabsContent>
        <TabsContent value="expiring" className="space-y-4">
          <SubscriptionTable status="expiring" />
        </TabsContent>
        <TabsContent value="expired" className="space-y-4">
          <SubscriptionTable status="expired" />
        </TabsContent>
        <TabsContent value="revoked" className="space-y-4">
          <SubscriptionTable status="revoked" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
