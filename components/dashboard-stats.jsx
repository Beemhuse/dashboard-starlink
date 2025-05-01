// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, Wifi, Clock, DollarSign } from "lucide-react"

// export function DashboardStats() {
//   // In a real app, you would fetch this data from your API
//   const stats = {
//     totalUsers: 1245,
//     totalAmount: 45750,
//     activeSubscriptions: 876,
//     expiredSubscriptions: 124,
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Service Areas</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">All service areas on the </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Service Areas</CardTitle>
//           <DollarSign className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">All services areas that are active </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Service Areas Running Low on Passwords</CardTitle>
//           <Wifi className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">Currently running Subscriptions</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Highest Subscription in 1  service area</CardTitle>
//           <Clock className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.expiredSubscriptions.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">Password that needs to be revoked </p>
//         </CardContent>
//       </Card>

//       {/* LINE 2 */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">Total registered password</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Active Password</CardTitle>
//           <DollarSign className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">All Passwords ready to be paid for</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Running Subscriptions</CardTitle>
//           <Wifi className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">Currently running Subscriptions</p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Expired Subscriptions</CardTitle>
//           <Clock className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.expiredSubscriptions.toLocaleString()}</div>
//           <p className="text-xs text-muted-foreground">Password that needs to be revoked </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Wifi,
  Clock,
  KeyRound,
  LogIn,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase"; // Import your Firebase database instance

export function DashboardStats(){
  const [stats, setStats] = useState({
    totalServiceAreas: 0,
    activeServiceAreas: 0,
    totalPasswords: 0,
    availablePasswords: 0,
    assignedPasswords: 0,
    expiredPasswords: 0,
    revokedPasswords: 0,
    totalActiveSubscription: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch service areas
        const serviceAreasCollection = collection(db, "serviceAreas");
        const serviceAreasSnapshot = await getDocs(serviceAreasCollection);
        const serviceAreasData = serviceAreasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Calculate active service areas
        const activeServiceAreasCount = serviceAreasData.filter(area => area.status === true).length;


        // Fetch passwords
        const passwordsCollection = collection(db, "passwords");
        const passwordsSnapshot = await getDocs(passwordsCollection);
        const passwordsData = passwordsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Calculate password statuses
        const availablePasswordsCount = passwordsData.filter(p => p.status === "available").length;
        const assignedPasswordsCount = passwordsData.filter(p => p.status === "assigned").length;
        const expiredPasswordsCount = passwordsData.filter(p => p.status === "expired").length;
        const revokedPasswordsCount = passwordsData.filter(p => p.status === "revoked").length;


        setStats({
          totalServiceAreas: serviceAreasData.length,
          activeServiceAreas: activeServiceAreasCount,
          totalPasswords: passwordsData.length,
          availablePasswords: availablePasswordsCount,
          assignedPasswords: assignedPasswordsCount,
          totalActiveSubscription: assignedPasswordsCount + expiredPasswordsCount,
          expiredPasswords: expiredPasswordsCount,
          revokedPasswords: revokedPasswordsCount,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard data...</div>; // Improved loading indicator
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* LINE 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Service Areas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServiceAreas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All service areas on the platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Service Areas</CardTitle>
            <LogIn className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeServiceAreas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All services areas that are active </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Subscriptions</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveSubscription.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ongoing Subscriptions and Expired Subscriptions that are not Revoked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Subscriptions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expiredPasswords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Passwords that needs to be revoked </p>
          </CardContent>
        </Card>

        {/* LINE 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPasswords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total registered password</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Passwords</CardTitle>
            <LogIn className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availablePasswords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All Passwords ready to be assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Passwords</CardTitle>
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedPasswords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Passwords currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revoked Passwords</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revokedPasswords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Passwords that have been revoked</p>
          </CardContent>
        </Card>
      </div>
   
  );
};


