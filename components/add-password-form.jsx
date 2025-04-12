"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  generateRandom: z.boolean().default(false),
  quantity: z.string().optional(),
})

export function AddPasswordForm({ areaId }) {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      generateRandom: false,
      quantity: "1",
    },
  })

  const watchGenerateRandom = form.watch("generateRandom")

  function onSubmit(values) {
    // In a real app, you would send this data to your API
    console.log({
      areaId,
      ...values,
      quantity: values.generateRandom ? Number.parseInt(values.quantity || "1") : 1,
    })

    // Reset form and refresh the page
    form.reset()
    router.push(`/service-areas/${areaId}/passwords?tab=manage`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Password</CardTitle>
        <CardDescription>
          Add a new password to this service area. You can add a single password or generate multiple random passwords.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="generateRandom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Generate Random Passwords</FormLabel>
                    <FormDescription>Automatically generate secure random passwords.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {!watchGenerateRandom ? (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a secure password" {...field} />
                    </FormControl>
                    <FormDescription>Create a strong password with at least 8 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Passwords</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="100" {...field} />
                    </FormControl>
                    <FormDescription>How many random passwords to generate (max 100).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/service-areas/${areaId}/passwords?tab=manage`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Key className="mr-2 h-4 w-4" />
              {watchGenerateRandom ? "Generate Passwords" : "Add Password"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
