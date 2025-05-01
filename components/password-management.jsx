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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Search, MoreHorizontal, Eye, EyeOff } from "lucide-react"

// export function PasswordManagement() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedArea, setSelectedArea] = useState("all")
//   const [selectedStatus, setSelectedStatus] = useState("all")
//   const [showPasswords, setShowPasswords] = useState({})

//   // Mock data - in a real app, you would fetch this from your API
//   const serviceAreas = [
//     { id: "area-001", name: "Downtown Station" },
//     { id: "area-002", name: "Westside Hub" },
//     { id: "area-003", name: "North Terminal" },
//     { id: "area-004", name: "East Station" },
//   ]

//   const passwords = [
//     {
//       id: "pwd-001",
//       password: "StarLink2023!",
//       areaId: "area-001",
//       areaName: "Downtown Station",
//       status: "available",
//       assignedTo: null,
//       assignedDate: null,
//       expiryDate: null,
//     },
//     {
//       id: "pwd-002",
//       password: "Connect4321!",
//       areaId: "area-001",
//       areaName: "Downtown Station",
//       status: "assigned",
//       assignedTo: "john@example.com",
//       assignedDate: "2023-10-15",
//       expiryDate: "2023-11-15",
//     },
//     {
//       id: "pwd-003",
//       password: "SecureWifi789!",
//       areaId: "area-002",
//       areaName: "Westside Hub",
//       status: "available",
//       assignedTo: null,
//       assignedDate: null,
//       expiryDate: null,
//     },
//     {
//       id: "pwd-004",
//       password: "InternetAccess!",
//       areaId: "area-002",
//       areaName: "Westside Hub",
//       status: "expired",
//       assignedTo: "alice@example.com",
//       assignedDate: "2023-08-10",
//       expiryDate: "2023-09-10",
//     },
//     {
//       id: "pwd-005",
//       password: "StarlinkUser!",
//       areaId: "area-003",
//       areaName: "North Terminal",
//       status: "revoked",
//       assignedTo: "bob@example.com",
//       assignedDate: "2023-07-05",
//       expiryDate: "2023-08-05",
//     },
//   ]

//   const togglePasswordVisibility = (id) => {
//     setShowPasswords((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }

//   const filteredPasswords = passwords.filter((pwd) => {
//     // Filter by search query
//     const matchesSearch =
//       pwd.password.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pwd.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (pwd.assignedTo && pwd.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()))

//     // Filter by area
//     const matchesArea = selectedArea === "all" || pwd.areaId === selectedArea

//     // Filter by status
//     const matchesStatus = selectedStatus === "all" || pwd.status === selectedStatus

//     return matchesSearch && matchesArea && matchesStatus
//   })

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "available":
//         return <Badge className="bg-green-500">Available</Badge>
//       case "assigned":
//         return <Badge className="bg-blue-500">Assigned</Badge>
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
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div className="flex items-center gap-2 w-full max-w-sm">
//           <Search className="h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search passwords..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-9"
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           <Select value={selectedArea} onValueChange={setSelectedArea}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Select Area" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Areas</SelectItem>
//               {serviceAreas.map((area) => (
//                 <SelectItem key={area.id} value={area.id}>
//                   {area.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="available">Available</SelectItem>
//               <SelectItem value="assigned">Assigned</SelectItem>
//               <SelectItem value="expired">Expired</SelectItem>
//               <SelectItem value="revoked">Revoked</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Password</TableHead>
//               <TableHead>Service Area</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Assigned To</TableHead>
//               <TableHead>Assigned Date</TableHead>
//               <TableHead>Expiry Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredPasswords.length > 0 ? (
//               filteredPasswords.map((pwd) => (
//                 <TableRow key={pwd.id}>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center gap-2">
//                       {showPasswords[pwd.id] ? pwd.password : "••••••••••"}
//                       <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(pwd.id)}>
//                         {showPasswords[pwd.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         <span className="sr-only">{showPasswords[pwd.id] ? "Hide password" : "Show password"}</span>
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell>{pwd.areaName}</TableCell>
//                   <TableCell>{getStatusBadge(pwd.status)}</TableCell>
//                   <TableCell>{pwd.assignedTo || "-"}</TableCell>
//                   <TableCell>{pwd.assignedDate || "-"}</TableCell>
//                   <TableCell>{pwd.expiryDate || "-"}</TableCell>
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
//                         {pwd.status === "available" && <DropdownMenuItem>Assign Password</DropdownMenuItem>}
//                         {pwd.status === "assigned" && <DropdownMenuItem>View Subscriber</DropdownMenuItem>}
//                         {pwd.status === "expired" && <DropdownMenuItem>Revoke Password</DropdownMenuItem>}
//                         {pwd.status === "revoked" && <DropdownMenuItem>Make Available</DropdownMenuItem>}
//                         <DropdownMenuItem>Edit Password</DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">Delete Password</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="h-24 text-center">
//                   No passwords found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, MoreHorizontal, Eye, EyeOff } from "lucide-react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "@/api/firebase";
// import { format } from "date-fns";

// export function PasswordManagement() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedArea, setSelectedArea] = useState("all");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [showPasswords, setShowPasswords] = useState({});
//   const [passwords, setPasswords] = useState([]);
//   const [serviceAreas, setServiceAreas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServiceAreas = async () => {
//       try {
//         const serviceAreasCollectionRef = collection(db, "serviceAreas");
//         const querySnapshot = await getDocs(serviceAreasCollectionRef);
//         const fetchedAreas = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//         }));
//         setServiceAreas(fetchedAreas);
//       } catch (err) {
//         console.error("Error fetching service areas:", err);
//         setError("Failed to fetch service areas.");
//       }
//     };

//     const fetchPasswords = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const passwordsCollectionRef = collection(db, "passwords");
//         const querySnapshot = await getDocs(
//           query(passwordsCollectionRef, orderBy("areaId"))
//         );
//         const fetchedPasswords = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setPasswords(fetchedPasswords);
//       } catch (err) {
//         console.error("Error fetching passwords:", err);
//         setError("Failed to fetch passwords.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceAreas();
//     fetchPasswords();
//   }, []);

//   const togglePasswordVisibility = (id) => {
//     setShowPasswords((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const getAreaName = (areaId) => {
//     const area = serviceAreas.find((a) => a.id === areaId);
//     return area ? area.name : "Unknown Area";
//   };

//   const filteredPasswords = passwords.filter((pwd) => {
//     const areaName = getAreaName(pwd.areaId).toLowerCase();
//     const assignedToLower = pwd.assignedTo ? pwd.assignedTo.toLowerCase() : "";

//     const matchesSearch =
//       pwd.password?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       areaName.includes(searchQuery.toLowerCase()) ||
//       assignedToLower.includes(searchQuery.toLowerCase());

//     const matchesArea = selectedArea === "all" || pwd.areaId === selectedArea;
//     const matchesStatus =
//       selectedStatus === "all" || pwd.status === selectedStatus;

//     return matchesSearch && matchesArea && matchesStatus;
//   });

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "available":
//         return <Badge className="bg-green-500">Available</Badge>;
//       case "assigned":
//         return <Badge className="bg-blue-500">Assigned</Badge>;
//       case "expired":
//         return <Badge className="bg-red-500">Expired</Badge>;
//       case "revoked":
//         return <Badge variant="outline">Revoked</Badge>;
//       default:
//         return null;
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (timestamp && timestamp.toDate) {
//       return format(timestamp.toDate(), "yyyy-MM-dd HH:mm:ss");
//     }
//     return "-";
//   };

//   if (loading) {
//     return <div>Loading passwords and service areas...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div className="flex items-center gap-2 w-full max-w-sm">
//           <Search className="h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search passwords, area..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-9"
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           <Select value={selectedArea} onValueChange={setSelectedArea}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Select Area" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Areas</SelectItem>
//               {serviceAreas.map((area) => (
//                 <SelectItem key={area.id} value={area.id}>
//                   {area.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="available">Available</SelectItem>
//               <SelectItem value="assigned">Assigned</SelectItem>
//               <SelectItem value="expired">Expired</SelectItem>
//               <SelectItem value="revoked">Revoked</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Password</TableHead>
//               <TableHead>Service Area</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Assigned To</TableHead>
//               <TableHead>Assigned Date</TableHead>
//               <TableHead>Expiry Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredPasswords.length > 0 ? (
//               filteredPasswords.map((pwd) => (
//                 <TableRow key={pwd.id}>
//                   <TableCell className="font-medium">
//                     <div className="flex items-center gap-2">
//                       {showPasswords[pwd.id] ? pwd.password : "••••••••••"}
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => togglePasswordVisibility(pwd.id)}
//                       >
//                         {showPasswords[pwd.id] ? (
//                           <EyeOff className="h-4 w-4" />
//                         ) : (
//                           <Eye className="h-4 w-4" />
//                         )}
//                         <span className="sr-only">
//                           {showPasswords[pwd.id]
//                             ? "Hide password"
//                             : "Show password"}
//                         </span>
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell>{getAreaName(pwd.areaId)}</TableCell>
//                   <TableCell>{getStatusBadge(pwd.status)}</TableCell>
//                   <TableCell>{pwd.assignedTo || "-"}</TableCell>
//                   <TableCell>
//                     {pwd.assignedDate
//                       ? new Date(pwd.assignedDate).toLocaleString(undefined, {
//                           year: "numeric",
//                           month: "numeric",
//                           day: "numeric",
//                           hour: "numeric",
//                           minute: "numeric",
//                           hour12: true,
//                         })
//                       : "-"}
//                   </TableCell>
//                   <TableCell>
//                     {pwd.expiryDate
//                       ? new Date(pwd.expiryDate).toLocaleString(undefined, {
//                           year: "numeric",
//                           month: "numeric",
//                           day: "numeric",
//                           hour: "numeric",
//                           minute: "numeric",
//                           hour12: true,
//                         })
//                       : "-"}
//                   </TableCell>
//                   <TableCell className="text-right">
//                   <Button
//                       size="sm"
//                       // onClick={() => {
//                       //   window.location.href = `/service-areas/${areaId}/passwords?tab=assign&passwordId=${pwd.id}`;
//                       // }}
//                       style={{backgroundColor: "red"}}
//                       disabled={pwd.status === "available"}
//                     >
//                       Revoke Password
//                     </Button>
//                     {/* <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                           <span className="sr-only">Open menu</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         {/* {pwd.status === "available" && <DropdownMenuItem >Assign Password</DropdownMenuItem>} */}
//                         {/* {pwd.assignedTo && <DropdownMenuItem>View Subscriber</DropdownMenuItem>} *
//                         {pwd.status === "expired" && (
//                           <DropdownMenuItem>Revoke Password</DropdownMenuItem>
//                         )}
//                         {/* {pwd.status === "revoked" && <DropdownMenuItem>Make Available</DropdownMenuItem>} */}
//                         {/* <DropdownMenuItem>Edit Password</DropdownMenuItem> */}
//                         {/* <DropdownMenuItem className="text-red-600">Delete Password</DropdownMenuItem> *
//                       </DropdownMenuContent>
//                     </DropdownMenu> */}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="h-24 text-center">
//                   No passwords found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Eye, EyeOff } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/api/firebase";
import { format } from "date-fns";

export function PasswordManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showPasswords, setShowPasswords] = useState({});
  const [passwords, setPasswords] = useState([]);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceAreas = async () => {
      try {
        const serviceAreasCollectionRef = collection(db, "serviceAreas");
        const querySnapshot = await getDocs(serviceAreasCollectionRef);
        const fetchedAreas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setServiceAreas(fetchedAreas);
      } catch (err) {
        console.error("Error fetching service areas:", err);
        setError("Failed to fetch service areas.");
      }
    };

    const fetchPasswords = async () => {
      setLoading(true);
      setError(null);
      try {
        const passwordsCollectionRef = collection(db, "passwords");
        const querySnapshot = await getDocs(
          query(passwordsCollectionRef, orderBy("areaId"))
        );
        const fetchedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswords(fetchedPasswords);
      } catch (err) {
        console.error("Error fetching passwords:", err);
        setError("Failed to fetch passwords.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAreas();
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getAreaName = (areaId) => {
    const area = serviceAreas.find((a) => a.id === areaId);
    return area ? area.name : "Unknown Area";
  };

  const handleRevokePassword = async (passwordId) => {
    try {
      const passwordRef = doc(db, "passwords", passwordId);
      await updateDoc(passwordRef, {
        status: "revoked",
      });
      // Update the local state to reflect the change
      setPasswords((prevPasswords) =>
        prevPasswords.map((p) =>
          p.id === passwordId ? { ...p, status: "revoked" } : p
        )
      );
      console.log(`Password ${passwordId} status updated to revoked.`);
    } catch (error) {
      console.error("Error revoking password:", error);
      setError("Failed to revoke password. Please try again.");
    }
  };

  const filteredPasswords = passwords.filter((pwd) => {
    const areaName = getAreaName(pwd.areaId).toLowerCase();
    const assignedToLower = pwd.assignedTo ? pwd.assignedTo.toLowerCase() : "";

    const matchesSearch =
      pwd.password?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      areaName.includes(searchQuery.toLowerCase()) ||
      assignedToLower.includes(searchQuery.toLowerCase());

    const matchesArea = selectedArea === "all" || pwd.areaId === selectedArea;
    const matchesStatus =
      selectedStatus === "all" || pwd.status === selectedStatus;

    return matchesSearch && matchesArea && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "assigned":
        return <Badge className="bg-blue-500">Assigned</Badge>;
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>;
      case "revoked":
        return <Badge variant="outline">Revoked</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return format(timestamp.toDate(), "yyyy-MM-dd HH:mm:ss");
    }
    return "-";
  };

  if (loading) {
    return <div>Loading passwords and service areas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search passwords, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {serviceAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Password</TableHead>
              <TableHead>Service Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPasswords.length > 0 ? (
              filteredPasswords.map((pwd) => (
                <TableRow key={pwd.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {showPasswords[pwd.id] ? pwd.password : "••••••••••"}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(pwd.id)}
                      >
                        {showPasswords[pwd.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPasswords[pwd.id]
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{getAreaName(pwd.areaId)}</TableCell>
                  <TableCell>{getStatusBadge(pwd.status)}</TableCell>
                  <TableCell>{pwd.assignedTo || "-"}</TableCell>
                  <TableCell>
                    {pwd.assignedDate
                      ? new Date(pwd.assignedDate).toLocaleString(undefined, {
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
                    {pwd.expiryDate
                      ? new Date(pwd.expiryDate).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {pwd.status === "expired" ? (
                      <Button
                        size="sm"
                        onClick={() => handleRevokePassword(pwd.id)}
                        style={{ backgroundColor: "red" }}
                        disabled={pwd.status === "available"}
                      >
                        Revoke Password
                      </Button>
                    ) : (
                      "-"
                    )}
                    {/* <Button
                      size="sm"
                      onClick={() => handleRevokePassword(pwd.id)}
                      style={{ backgroundColor: "red" }}
                      disabled={pwd.status === "available"}
                    >
                      Revoke Password
                    </Button> */}
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* {pwd.status === "available" && <DropdownMenuItem >Assign Password</DropdownMenuItem>} */}
                    {/* {pwd.assignedTo && <DropdownMenuItem>View Subscriber</DropdownMenuItem>} *
                        {pwd.status === "expired" && (
                          <DropdownMenuItem>Revoke Password</DropdownMenuItem>
                        )}
                        {/* {pwd.status === "revoked" && <DropdownMenuItem>Make Available</DropdownMenuItem>} */}
                    {/* <DropdownMenuItem>Edit Password</DropdownMenuItem> */}
                    {/* <DropdownMenuItem className="text-red-600">Delete Password</DropdownMenuItem> *
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No passwords found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
