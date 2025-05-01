// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Eye, EyeOff } from "lucide-react"

// export function AreaPasswordsList({ areaId }) {
//   const [showPasswords, setShowPasswords] = useState({})

//   // Mock data - in a real app, you would fetch this from your API
//   const passwords = [
//     {
//       id: "pwd-001",
//       password: "StarLink2023!",
//       status: "available",
//       assignedTo: null,
//       assignedDate: null,
//       expiryDate: null,
//     },
//     {
//       id: "pwd-002",
//       password: "Connect4321!",
//       status: "assigned",
//       assignedTo: "john@example.com",
//       assignedDate: "2023-10-15",
//       expiryDate: "2023-11-15",
//     },
//     {
//       id: "pwd-006",
//       password: "SecureNet567!",
//       status: "available",
//       assignedTo: null,
//       assignedDate: null,
//       expiryDate: null,
//     },
//   ]

//   const togglePasswordVisibility = (id) => {
//     setShowPasswords((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }

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
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Password</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Assigned To</TableHead>
//             <TableHead>Assigned Date</TableHead>
//             <TableHead>Expiry Date</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {passwords.length > 0 ? (
//             passwords.map((pwd) => (
//               <TableRow key={pwd.id}>
//                 <TableCell className="font-medium">
//                   <div className="flex items-center gap-2">
//                     {showPasswords[pwd.id] ? pwd.password : "••••••••••"}
//                     <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(pwd.id)}>
//                       {showPasswords[pwd.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       <span className="sr-only">{showPasswords[pwd.id] ? "Hide password" : "Show password"}</span>
//                     </Button>
//                   </div>
//                 </TableCell>
//                 <TableCell>{getStatusBadge(pwd.status)}</TableCell>
//                 <TableCell>{pwd.assignedTo || "-"}</TableCell>
//                 <TableCell>{pwd.assignedDate || "-"}</TableCell>
//                 <TableCell>{pwd.expiryDate || "-"}</TableCell>
//                 <TableCell className="text-right">
//                   {pwd.status === "available" ? (
//                     <Button
//                       size="sm"
//                       onClick={() => {
//                         window.location.href = `/service-areas/${areaId}/passwords?tab=assign&passwordId=${pwd.id}`
//                       }}
//                     >
//                       Assign Password
//                     </Button>
//                   ) : (
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href={`/subscribers/${pwd.assignedTo?.split("@")[0]}`}>View User</Link>
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={6} className="h-24 text-center">
//                 No passwords found for this area.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Eye, EyeOff } from "lucide-react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/api/firebase";

// export function AreaPasswordsList({ areaId }) {
//   const [showPasswords, setShowPasswords] = useState({});
//   const [passwords, setPasswords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPasswords = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const passwordsCollectionRef = collection(db, "passwords");
//         const q = query(passwordsCollectionRef, where("areaId", "==", areaId));
//         const querySnapshot = await getDocs(q);
//         const fetchedPasswords = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setPasswords(fetchedPasswords);
//       } catch (err) {
//         console.error("Error fetching passwords:", err);
//         setError("Failed to fetch passwords. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPasswords();
//   }, [areaId]);

//   const togglePasswordVisibility = (id) => {
//     setShowPasswords((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

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

//   if (loading) {
//     return <div>Loading passwords...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Password</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Assigned To</TableHead>
//             <TableHead>Assigned Date</TableHead>
//             <TableHead>Expiry Date</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {passwords.length > 0 ? (
//             passwords.map((pwd) => (
//               <TableRow key={pwd.id}>
//                 <TableCell className="font-medium">
//                   <div className="flex items-center gap-2">
//                     {showPasswords[pwd.id] ? pwd.password : "••••••••••"}
//                     <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(pwd.id)}>
//                       {showPasswords[pwd.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       <span className="sr-only">
//                         {showPasswords[pwd.id] ? "Hide password" : "Show password"}
//                       </span>
//                     </Button>
//                   </div>
//                 </TableCell>
//                 <TableCell>{getStatusBadge(pwd.status)}</TableCell>
//                 <TableCell>{pwd.assignedTo || "-"}</TableCell>

//                 <TableCell>
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
//                 <TableCell className="text-right">

//                     <Button
//                       size="sm"
//                       // onClick={() => {
//                       //   window.location.href = `/service-areas/${areaId}/passwords?tab=assign&passwordId=${pwd.id}`;
//                       // }}
//                       style={{backgroundColor: "red"}}
//                       disabled={pwd.status === "available"}
//                     >
//                       Revoke Password
//                     </Button>

//                   {/* {pwd.status === "available" ? (
//                     <Button
//                       size="sm"
//                       onClick={() => {
//                         window.location.href = `/service-areas/${areaId}/passwords?tab=assign&passwordId=${pwd.id}`;
//                       }}
//                       disabled
//                     >
//                       Assign Password
//                     </Button>
//                   ) : pwd.assignedTo ? (
//                     <Button variant="outline" size="sm" asChild disabled>
//                       <Link href={`/subscribers/${pwd.assignedTo?.split("@")[0]}`}>View User</Link>
//                     </Button>
//                   ) : (
//                     "-"
//                   )} */}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={6} className="h-24 text-center">
//                 No passwords found for this area.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/api/firebase";

export function AreaPasswordsList({ areaId }) {
  const [showPasswords, setShowPasswords] = useState({});
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPasswords = async () => {
      setLoading(true);
      setError(null);
      try {
        const passwordsCollectionRef = collection(db, "passwords");
        const q = query(passwordsCollectionRef, where("areaId", "==", areaId));
        const querySnapshot = await getDocs(q);
        const fetchedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswords(fetchedPasswords);
      } catch (err) {
        console.error("Error fetching passwords:", err);
        setError("Failed to fetch passwords. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, [areaId]);

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  if (loading) {
    return <div>Loading passwords...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Password</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Assigned Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passwords.length > 0 ? (
            passwords.map((pwd) => (
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
                  ) : ( "-") }

                  {/* {pwd.status === "available" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        window.location.href = `/service-areas/${areaId}/passwords?tab=assign&passwordId=${pwd.id}`;
                      }}
                      disabled
                    >
                      Assign Password
                    </Button>
                  ) : pwd.assignedTo ? (
                    <Button variant="outline" size="sm" asChild disabled>
                      <Link href={`/subscribers/${pwd.assignedTo?.split("@")[0]}`}>View User</Link>
                    </Button>
                  ) : (
                    "-"
                  )} */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No passwords found for this area.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
