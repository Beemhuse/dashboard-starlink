"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Users, Key } from "lucide-react"

export function ServiceAreaList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, you would fetch this from your API
  const serviceAreas = [
    {
      id: "area-001",
      name: "Downtown Station",
      location: "123 Main St, Downtown",
      activeUsers: 45,
      totalPasswords: 50,
      availablePasswords: 5,
      status: "active",
    },
    {
      id: "area-002",
      name: "Westside Hub",
      location: "456 West Ave, Westside",
      activeUsers: 32,
      totalPasswords: 40,
      availablePasswords: 8,
      status: "active",
    },
    {
      id: "area-003",
      name: "North Terminal",
      location: "789 North Blvd, Northside",
      activeUsers: 28,
      totalPasswords: 30,
      availablePasswords: 2,
      status: "active",
    },
    {
      id: "area-004",
      name: "East Station",
      location: "321 East St, Eastside",
      activeUsers: 0,
      totalPasswords: 25,
      availablePasswords: 25,
      status: "maintenance",
    },
  ]

  const filteredAreas = serviceAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search service areas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAreas.map((area) => (
          <Card key={area.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{area.name}</CardTitle>
                {area.status === "active" ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : (
                  <Badge variant="outline">Maintenance</Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {area.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">{area.activeUsers}</p>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">
                      {area.availablePasswords}/{area.totalPasswords}
                    </p>
                    <p className="text-xs text-muted-foreground">Available Passwords</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/service-areas/${area.id}`}>View Details</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/service-areas/${area.id}/passwords`}>Manage Passwords</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
