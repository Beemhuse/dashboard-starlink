"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  subscriberId: z.string().min(1, {
    message: "Please select a subscriber.",
  }),
  areaId: z.string().min(1, {
    message: "Please select a service area.",
  }),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  duration: z.string().min(1, {
    message: "Please select a subscription duration.",
  }),
})

export default function NewSubscriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")

  // Mock data - in a real app, you would fetch this from your API
  const subscribers = [
    { id: "user-001", name: "John Doe", email: "john@example.com" },
    { id: "user-002", name: "Jane Smith", email: "jane@example.com" },
    { id: "user-003", name: "Bob Johnson", email: "bob@example.com" },
    { id: "user-004", name: "Alice Brown", email: "alice@example.com" },
    { id: "user-005", name: "Charlie Wilson", email: "charlie@example.com" },
  ]

  const serviceAreas = [
    { id: "area-001", name: "Downtown Station" },
    { id: "area-002", name: "Westside Hub" },
    { id: "area-003", name: "North Terminal" },
    { id: "area-004", name: "East Station" },
  ]

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriberId: userId || "",
      areaId: "",
      duration: "1-month",
    },
  })

  function onSubmit(values) {
    // In a real app, you would send this data to your API
    console.log(values)

    // Redirect to subscriptions dashboard with success message
    router.push("/subscriptions?success=created")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/subscriptions">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Add New Subscription</h2>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Subscription</CardTitle>
          <CardDescription>
            Set up a new subscription for a subscriber to access a Starlink service area.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="subscriberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscriber</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subscriber" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subscribers.map((subscriber) => (
                          <SelectItem key={subscriber.id} value={subscriber.id}>
                            {subscriber.name} ({subscriber.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The subscriber who will receive this subscription.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="areaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Area</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>The service area this subscription will provide access to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subscription duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-month">1 Month ($50)</SelectItem>
                        <SelectItem value="3-months">3 Months ($140)</SelectItem>
                        <SelectItem value="6-months">6 Months ($270)</SelectItem>
                        <SelectItem value="12-months">12 Months ($500)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How long the subscription will last.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>When the subscription will begin.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/subscriptions">Cancel</Link>
              </Button>
              <Button type="submit">Create Subscription</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
