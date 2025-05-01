// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { MoreHorizontal, Search, RefreshCw } from "lucide-react"
// import Link from "next/link"

// export function SubscriptionTable({ status }) {
//   const [searchQuery, setSearchQuery] = useState("")

//   // Mock data - in a real app, you would fetch this from your API
//   const subscriptions = [
//     {
//       id: "SUB-001",
//       user: "John Doe",
//       userId: "user-001",
//       email: "john@example.com",
//       area: "Downtown Station",
//       areaId: "area-001",
//       startDate: "2023-10-15",
//       endDate: "2023-11-15",
//       status: "active",
//       daysLeft: 12,
//     },
//     {
//       id: "SUB-002",
//       user: "Jane Smith",
//       userId: "user-002",
//       email: "jane@example.com",
//       area: "Westside Hub",
//       areaId: "area-002",
//       startDate: "2023-09-20",
//       endDate: "2023-10-20",
//       status: "expiring",
//       daysLeft: 2,
//     },
//     {
//       id: "SUB-003",
//       user: "Bob Johnson",
//       userId: "user-003",
//       email: "bob@example.com",
//       area: "North Terminal",
//       areaId: "area-003",
//       startDate: "2023-08-05",
//       endDate: "2023-09-05",
//       status: "expired",
//       daysLeft: 0,
//     },
//     {
//       id: "SUB-004",
//       user: "Alice Brown",
//       userId: "user-004",
//       email: "alice@example.com",
//       area: "East Station",
//       areaId: "area-004",
//       startDate: "2023-07-10",
//       endDate: "2023-08-10",
//       status: "revoked",
//       daysLeft: 0,
//     },
//     {
//       id: "SUB-005",
//       user: "Charlie Wilson",
//       userId: "user-005",
//       email: "charlie@example.com",
//       area: "Downtown Station",
//       areaId: "area-001",
//       startDate: "2023-10-01",
//       endDate: "2023-11-01",
//       status: "active",
//       daysLeft: 8,
//     },
//   ].filter((sub) => sub.status === status)

//   const filteredSubscriptions = subscriptions.filter(
//     (sub) =>
//       sub.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       sub.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       sub.id.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const getStatusBadge = (status, daysLeft) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Active</Badge>
//       case "expiring":
//         return <Badge className="bg-yellow-500">Expiring in {daysLeft} days</Badge>
//       case "expired":
//         return <Badge className="bg-red-500">Expired</Badge>
//       case "revoked":
//         return <Badge variant="outline">Revoked</Badge>
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2 w-full max-w-sm">
//           <Search className="h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search subscriptions..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-9"
//           />
//         </div>
//         <Button variant="outline" size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Subscription ID</TableHead>
//               <TableHead>User</TableHead>
//               <TableHead>Service Area</TableHead>
//               <TableHead>Start Date</TableHead>
//               <TableHead>End Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredSubscriptions.length > 0 ? (
//               filteredSubscriptions.map((subscription) => (
//                 <TableRow key={subscription.id}>
//                   <TableCell className="font-medium">{subscription.id}</TableCell>
//                   <TableCell>
//                     <div>
//                       <div>{subscription.user}</div>
//                       <div className="text-sm text-muted-foreground">{subscription.email}</div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Link href={`/service-areas/${subscription.areaId}`} className="text-primary hover:underline">
//                       {subscription.area}
//                     </Link>
//                   </TableCell>
//                   <TableCell>{subscription.startDate}</TableCell>
//                   <TableCell>{subscription.endDate}</TableCell>
//                   <TableCell>{getStatusBadge(subscription.status, subscription.daysLeft)}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                           <span className="sr-only">Open menu</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem asChild>
//                           <Link href={`/subscribers/${subscription.userId}`}>View Subscriber</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem asChild>
//                           <Link href={`/service-areas/${subscription.areaId}`}>View Service Area</Link>
//                         </DropdownMenuItem>
//                         {subscription.status === "expired" && <DropdownMenuItem>Revoke Password</DropdownMenuItem>}
//                         {subscription.status === "active" && <DropdownMenuItem>Extend Subscription</DropdownMenuItem>}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="h-24 text-center">
//                   No subscriptions found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }


"use client"

import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../api/firebase"; // Import your Firebase database instance


export function SubscriptionTable({ status }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [lastFetchedDoc, setLastFetchedDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);


  const fetchSubscriptions = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const subscriptionsCollection = collection(db, "passwords"); // Use "passwords" collection
      let q = query(subscriptionsCollection, orderBy("assignedDate", "desc")); // Order by assignedDate

      if (lastFetchedDoc && page > 1) {
        q = query(q, startAfter(lastFetchedDoc));
      }
      q = query(q, limit(itemsPerPage));


      const querySnapshot = await getDocs(q);
      const subscriptionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("subscriptionsData from Firestore:", subscriptionsData); // Add this line

      if (subscriptionsData.length < itemsPerPage) {
        setHasMore(false);
      }
      if (subscriptionsData.length > 0) {
        setLastFetchedDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }


      // Group subscriptions by userId and find the most recent one
      const userSubscriptions = {};
      subscriptionsData.forEach((sub) => {
        if (!userSubscriptions[sub.assignedTo]) {
          userSubscriptions[sub.assignedTo] = [];
        }
        userSubscriptions[sub.assignedTo].push(sub);
      });

      const mostRecentSubscriptions = [];
      for (const userId in userSubscriptions) {
        const sortedSubscriptions = userSubscriptions[userId].sort(
          (a, b) => new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime()
        );

        if (sortedSubscriptions.length > 0) {
          const mostRecent = sortedSubscriptions[0];
          // Calculate days left
          const today = new Date();
          const endDate = new Date(mostRecent.expiryDate);
          const timeDiff = endDate.getTime() - today.getTime();
          const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
          mostRecentSubscriptions.push({
            id: mostRecent.id,
            password: mostRecent.password,
            user: mostRecent.assignedTo, // Or fetch from user data if available
            userId: mostRecent.assignedTo,
            email: mostRecent.assignedTo, //  fetch from user data if available
            area: mostRecent.areaId, //  You might need to fetch the area name
            areaId: mostRecent.areaId,
            startDate: mostRecent.assignedDate,
            endDate: mostRecent.expiryDate,
            status: mostRecent.status,
            daysLeft: daysLeft > 0 ? daysLeft : 0,
          });
        }
      }
      console.log("mostRecentSubscriptions:", mostRecentSubscriptions); // Add this line

      // Append the new subscriptions to the existing ones
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, ...mostRecentSubscriptions]);

    } catch (error) {
      setError(error.message || "Failed to fetch subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(currentPage);
  }, [currentPage]);


  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      (sub.user || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.area || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.id || '').toLowerCase().includes(searchQuery.toLowerCase()),
  )
  .filter((sub) => sub.status === "assigned")

    console.log("filteredSubscriptions:", filteredSubscriptions); // Add this line


  const getStatusBadge = (status, daysLeft) => {
    switch (status) {
      case "assigned":
        return <Badge className="bg-green-500">Active</Badge>
      case "available":
        return <Badge className="bg-yellow-500">Expiring in {daysLeft} days</Badge>
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>
      case "revoked":
        return <Badge variant="outline">Revoked</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return <div>Loading subscriptions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscriptions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1) return;
    setCurrentPage(pageNumber);
  };

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => {
          setSubscriptions([]);
          setCurrentPage(1);
          setLastFetchedDoc(null);
          setHasMore(true);
          fetchSubscriptions(1);
        }}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subscription ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Service Area</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{subscription.user}</div>
                      <div className="text-sm text-muted-foreground">{subscription.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/service-areas/${subscription.areaId}`} className="text-primary hover:underline">
                      {subscription.area}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {subscription.startDate ? new Date(subscription.startDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {subscription.endDate ? new Date(subscription.endDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(subscription.status, subscription.daysLeft)}</TableCell>
                <TableCell className="text-right">{subscription.password} </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No subscriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      {hasMore && (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  )
}
