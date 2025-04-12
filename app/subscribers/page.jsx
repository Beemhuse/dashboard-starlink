import { SubscribersList } from "@/components/subscribers-list"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function SubscribersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Subscribers</h2>
        <Button asChild>
          <Link href="/subscribers/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Subscriber
          </Link>
        </Button>
      </div>

      <SubscribersList />
    </div>
  )
}
