


import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users, Key, Wifi, Clock, Edit } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/api/firebase"; // Import your Firebase database instance

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AreaSubscribersList } from "@/components/area-subscribers-list";
import { AreaPasswordsList } from "@/components/area-passwords-list";

async function getServiceArea(id) {
  try {
    const serviceAreaDocRef = doc(db, "serviceAreas", id);
    const docSnap = await getDoc(serviceAreaDocRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching service area:", error);
    return null;
  }
}

export default async function ServiceAreaDetailsPage({ params }) {
  const area = await getServiceArea(params.id);

  if (!area) {
    notFound();
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
        {/* {area.status === "active" ? (
          <Badge className="bg-green-500">Active</Badge>
        ) : (
          <Badge variant="outline">{area.status || "Inactive"}</Badge>
        )} */}
        {/* <div className="ml-auto">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Area 
          </Button>
        </div> */}
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="mr-1 h-4 w-4" /> {area.location}
        {area.coordinates && (
          <span className="ml-4">
            <span className="font-medium">Coordinates:</span> {area.coordinates}
          </span>
        )}
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Out of {area.maxConnections || "N/A"} max connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Passwords</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {area.availablePasswords || 0}/{area.totalPasswords || 0}
            </div>
            <p className="text-xs text-muted-foreground">Passwords ready to assign</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passwords Expiring Soon</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.averageSpeed || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Current network performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"> New Subscriptions This Period</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.lastMaintenance || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Area created on {area.createdAt || "N/A"}</p>
          </CardContent>
        </Card>
      </div> */}

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

      <Tabs defaultValue="passwords" className="space-y-4">
        <TabsList>
          {/* <TabsTrigger value="subscribers">Active Subscribers</TabsTrigger> */}
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
        </TabsList>
        <TabsContent value="subscribers" className="space-y-4">
          <AreaSubscribersList areaId={area.id} /> {/* You'll need to update this component to fetch data */}
        </TabsContent>
        <TabsContent value="passwords" className="space-y-4">
          <AreaPasswordsList areaId={area.id} /> {/* You'll need to update this component to fetch data */}
        </TabsContent>
      </Tabs>
    </div>
  );
}