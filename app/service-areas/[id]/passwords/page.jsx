// import { use } from "react"
// import { notFound } from "next/navigation"
// import Link from "next/link"
// import { ArrowLeft, Upload, Plus } from "lucide-react"
// import { db } from "@/api/firebase";
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AreaPasswordManagement } from "@/components/area-password-management"
// import { UploadPasswordsForm } from "@/components/upload-passwords-form"
// import { AddPasswordForm } from "@/components/add-password-form"
// import { AssignPasswordForm } from "@/components/assign-password-form"

// async function getServiceArea(id) {
//   try {
//     const serviceAreaDocRef = doc(db, "serviceAreas", id);
//     const docSnap = await getDoc(serviceAreaDocRef);

//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching service area:", error);
//     return null;
//   }
// }

// export default function AreaPasswordsPage(props) {
//   const params = use(props.params)
//   const searchParams = use(props.searchParams)

//   const id = params.id
//   const defaultTab = searchParams?.tab || "manage"
//   const passwordId = searchParams?.passwordId || null

//   const area = getServiceArea(id)
//   if (!area) notFound()

//   return (
//     <div className="flex-1 space-y-4 p-8 pt-6">
//       <div className="flex items-center gap-2">
//         <Button variant="outline" size="icon" asChild>
//           <Link href={`/service-areas/${id}`}>
//             <ArrowLeft className="h-4 w-4" />
//             <span className="sr-only">Back</span>
//           </Link>
//         </Button>
//         <h2 className="text-3xl font-bold tracking-tight">Password Management</h2>
//         <div className="text-muted-foreground">{area.name}</div>
//       </div>

//       <div className="flex flex-wrap gap-2">
//         <Button asChild>
//           <Link href={`/service-areas/${id}/passwords?tab=add`}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Password
//           </Link>
//         </Button>
//         <Button variant="outline" asChild>
//           <Link href={`/service-areas/${id}/passwords?tab=upload`}>
//             <Upload className="mr-2 h-4 w-4" />
//             Upload Passwords
//           </Link>
//         </Button>
//       </div>

//       <Tabs defaultValue={defaultTab} className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="manage" asChild>
//             <Link href={`/service-areas/${id}/passwords?tab=manage`}>
//               Manage Passwords
//             </Link>
//           </TabsTrigger>
//           <TabsTrigger value="add" asChild>
//             <Link href={`/service-areas/${id}/passwords?tab=add`}>
//               Add Password
//             </Link>
//           </TabsTrigger>
//           <TabsTrigger value="upload" asChild>
//             <Link href={`/service-areas/${id}/passwords?tab=upload`}>
//               Upload Passwords
//             </Link>
//           </TabsTrigger>
//           {passwordId && (
//             <TabsTrigger value="assign" asChild>
//               <Link href={`/service-areas/${id}/passwords?tab=assign`}>
//                 Assign Password
//               </Link>
//             </TabsTrigger>
//           )}
//         </TabsList>

//         <TabsContent value="manage" className="space-y-4">
//           <AreaPasswordManagement areaId={id} />
//         </TabsContent>
//         <TabsContent value="add" className="space-y-4">
//           <AddPasswordForm areaId={id} />
//         </TabsContent>
//         <TabsContent value="upload" className="space-y-4">
//           <UploadPasswordsForm areaId={id} />
//         </TabsContent>
//         <TabsContent value="assign" className="space-y-4">
//           {passwordId && <AssignPasswordForm areaId={id} passwordId={passwordId} />}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/api/firebase";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaPasswordManagement } from "@/components/area-password-management";
import { UploadPasswordsForm } from "@/components/upload-passwords-form";
import { AddPasswordForm } from "@/components/add-password-form";
import { AssignPasswordForm } from "@/components/assign-password-form";

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

export default async function AreaPasswordsPage({ params, searchParams }) {
  const id = params.id;
  const defaultTab = searchParams?.tab || "manage";
  const passwordId = searchParams?.passwordId || null;

  const area = await getServiceArea(id);
  if (!area) notFound();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/service-areas/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">
          Password Management
        </h2>
        <div className="text-muted-foreground">{area.name}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* <Button asChild>
          <Link href={`/service-areas/${id}/passwords?tab=add`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Password
          </Link>
        </Button> */}
        {/* <Button variant="outline" asChild>
          <Link href={`/service-areas/${id}/passwords?tab=upload`}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Passwords
          </Link>
        </Button> */}
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage" asChild>
            <Link href={`/service-areas/${id}/passwords?tab=manage`}>
              Manage Passwords
            </Link>
          </TabsTrigger>
          <TabsTrigger value="add" asChild>
            <Link href={`/service-areas/${id}/passwords?tab=add`}>
              Add Password
            </Link>
          </TabsTrigger>
          {/* <TabsTrigger value="upload" asChild>
            <Link href={`/service-areas/${id}/passwords?tab=upload`}>
              Upload Passwords
            </Link>
          </TabsTrigger> */}
          {passwordId && (
            <TabsTrigger value="assign" asChild>
              <Link href={`/service-areas/${id}/passwords?tab=assign`}>
                Assign Password
              </Link>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <AreaPasswordManagement areaId={id} />
        </TabsContent>
        <TabsContent value="add" className="space-y-4">
          <AddPasswordForm areaId={id} />
        </TabsContent>
        <TabsContent value="upload" className="space-y-4">
          <UploadPasswordsForm areaId={id} />
        </TabsContent>
        <TabsContent value="assign" className="space-y-4">
          {passwordId && (
            <AssignPasswordForm areaId={id} passwordId={passwordId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
