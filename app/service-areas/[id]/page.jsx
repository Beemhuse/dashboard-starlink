import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Users, Key, Wifi, Clock, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AreaSubscribersList } from "@/components/area-subscribers-list"
import { AreaPasswordsList } from "@/components/area-passwords-list"

// This would normally come from your database
const getServiceArea = (id) => {
  const serviceAreas = [
    {
      id: "area-001",
      name: "Downtown Station",
      location: "123 Main St, Downtown",
      description:
        "Our main Starlink station located in the heart of downtown, providing high-speed internet to the business district.",
      coordinates: "40.7128° N, 74.0060° W",
      activeUsers: 45,
      totalPasswords: 50,
      availablePasswords: 5,
      status: "active",
      createdAt: "2023-01-15",
      lastMaintenance: "2023-09-20",
      averageSpeed: "150 Mbps",
      maxConnections: 75,
    },
    {
      id: "area-002",
      name: "Westside Hub",
      location: "456 West Ave, Westside",
      description: "Serving the residential areas on the west side of town with reliable Starlink connectivity.",
      coordinates: "40.7128° N, 74.0160° W",
      activeUsers: 32,
      totalPasswords: 40,
      availablePasswords: 8,
      status: "active",
      createdAt: "2023-02-10",
      lastMaintenance: "2023-08-15",
      averageSpeed: "120 Mbps",
      maxConnections: 50,
    },
    {
      id: "area-003",
      name: "North Terminal",
      location: "789 North Blvd, Northside",
      description: "Our northern terminal providing coverage to suburban areas and small businesses.",
      coordinates: "40.7228° N, 74.0060° W",
      activeUsers: 28,
      totalPasswords: 30,
      availablePasswords: 2,
      status: "active",
      createdAt: "2023-03-05",
      lastMaintenance: "2023-09-01",
      averageSpeed: "135 Mbps",
      maxConnections: 40,
    },
    {
      id: "area-004",
      name: "East Station",
      location: "321 East St, Eastside",
      description: "Currently under maintenance. This station serves the eastern industrial zone.",
      coordinates: "40.7128° N, 73.9960° W",
      activeUsers: 0,
      totalPasswords: 25,
      availablePasswords: 25,
      status: "maintenance",
      createdAt: "2023-04-20",
      lastMaintenance: "2023-10-01",
      averageSpeed: "0 Mbps",
      maxConnections: 35,
    },
  ]

  const area = serviceAreas.find((area) => area.id === id)
  if (!area) return null
  return area
}

export default async function ServiceAreaDetailsPage({ params }) {
  const area = getServiceArea(params.id)

  if (!area) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/service-areas">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{area.name}</h2>
        {area.status === "active" ? (
          <Badge className="bg-green-500">Active</Badge>
        ) : (
          <Badge variant="outline">Maintenance</Badge>
        )}
        <div className="ml-auto">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Area
          </Button>
        </div>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="mr-1 h-4 w-4" /> {area.location}
        {area.coordinates && (
          <span className="ml-4">
            <span className="font-medium">Coordinates:</span> {area.coordinates}
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Out of {area.maxConnections} max connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Passwords</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {area.availablePasswords}/{area.totalPasswords}
            </div>
            <p className="text-xs text-muted-foreground">Passwords ready to assign</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.averageSpeed}</div>
            <p className="text-xs text-muted-foreground">Current network performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Maintenance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.lastMaintenance}</div>
            <p className="text-xs text-muted-foreground">Area created on {area.createdAt}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{area.description}</p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Area Management</h3>
        <Button asChild>
          <Link href={`/service-areas/${area.id}/passwords`}>
            <Key className="mr-2 h-4 w-4" />
            Manage Passwords
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="subscribers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscribers">Active Subscribers</TabsTrigger>
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
        </TabsList>
        <TabsContent value="subscribers" className="space-y-4">
          <AreaSubscribersList areaId={area.id} />
        </TabsContent>
        <TabsContent value="passwords" className="space-y-4">
          <AreaPasswordsList areaId={area.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
