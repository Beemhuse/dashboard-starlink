// // "use client"

// // import { useRouter } from "next/navigation"
// // import { useForm } from "react-hook-form"
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { z } from "zod"
// // import { Key } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// // import { Input } from "@/components/ui/input"
// // import { Switch } from "@/components/ui/switch"

// // const formSchema = z.object({
// //   password: z.string().min(8, {
// //     message: "Password must be at least 8 characters.",
// //   }),
// //   generateRandom: z.boolean().default(false),
// //   quantity: z.string().optional(),
// // })

// // export function AddPasswordForm({ areaId }) {
// //   const router = useRouter()

// //   const form = useForm({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       password: "",
// //       generateRandom: false,
// //       quantity: "1",
// //     },
// //   })

// //   const watchGenerateRandom = form.watch("generateRandom")

// //   function onSubmit(values) {
// //     // In a real app, you would send this data to your API
// //     console.log({
// //       areaId,
// //       ...values,
// //       quantity: values.generateRandom ? Number.parseInt(values.quantity || "1") : 1,
// //     })

// //     // Reset form and refresh the page
// //     form.reset()
// //     router.push(`/service-areas/${areaId}/passwords?tab=manage`)
// //   }

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Add Password</CardTitle>
// //         <CardDescription>
// //           Add a new password to this service area. You can add a single password or generate multiple random passwords.
// //         </CardDescription>
// //       </CardHeader>
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSubmit)}>
// //           <CardContent className="space-y-4">
// //             {/* <FormField
// //               control={form.control}
// //               name="generateRandom"
// //               render={({ field }) => (
// //                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
// //                   <div className="space-y-0.5">
// //                     <FormLabel className="text-base">Generate Random Passwords</FormLabel>
// //                     <FormDescription>Automatically generate secure random passwords.</FormDescription>
// //                   </div>
// //                   <FormControl>
// //                     <Switch checked={field.value} onCheckedChange={field.onChange} />
// //                   </FormControl>
// //                 </FormItem>
// //               )}
// //             /> */}

// //             {!watchGenerateRandom ? (
// //               <FormField
// //                 control={form.control}
// //                 name="password"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Password</FormLabel>
// //                     <FormControl>
// //                       <Input placeholder="Enter a secure password" {...field} />
// //                     </FormControl>
// //                     <FormDescription>Create a strong password with at least 8 characters.</FormDescription>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />
// //             ) : (
// //               <FormField
// //                 control={form.control}
// //                 name="quantity"
// //                 render={({ field }) => (
// //                   <FormItem>
// //                     <FormLabel>Number of Passwords</FormLabel>
// //                     <FormControl>
// //                       <Input type="number" min="1" max="100" {...field} />
// //                     </FormControl>
// //                     <FormDescription>How many random passwords to generate (max 100).</FormDescription>
// //                     <FormMessage />
// //                   </FormItem>
// //                 )}
// //               />
// //             )}
// //           </CardContent>
// //           <CardFooter className="flex justify-between">
// //             <Button
// //               type="button"
// //               variant="outline"
// //               onClick={() => router.push(`/service-areas/${areaId}/passwords?tab=manage`)}
// //             >
// //               Cancel
// //             </Button>
// //             <Button type="submit">
// //               <Key className="mr-2 h-4 w-4" />
// //               {watchGenerateRandom ? "Generate Passwords" : "Add Password"}
// //             </Button>
// //           </CardFooter>
// //         </form>
// //       </Form>
// //     </Card>
// //   )
// // }



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Key } from "lucide-react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/api/firebase";
// import { toast } from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Loader2 } from "lucide-react";

// const formSchema = z.object({
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
//   generateRandom: z.boolean().default(false),
//   quantity: z.string().optional(),
// });

// function generateRandomPassword(length = 12) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return password;
// }

// export function AddPasswordForm({ areaId }) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       password: "",
//       generateRandom: false,
//       quantity: "1",
//     },
//   });

//   const watchGenerateRandom = form.watch("generateRandom");

//   async function onSubmit(values) {
//     setIsLoading(true);
//     try {
//       const passwordsCollectionRef = collection(db, "passwords");
//       const quantity = values.generateRandom ? Number.parseInt(values.quantity || "1") : 1;

//       const passwordsToCreate = [];
//       if (values.generateRandom) {
//         for (let i = 0; i < quantity; i++) {
//           passwordsToCreate.push({
//             areaId: areaId,
//             password: generateRandomPassword(),
//             status: "unused",
//             assignedTo: null,
//             assignedDate: null,
//             expiryDate: null,
//           });
//         }
//       } else {
//         passwordsToCreate.push({
//           areaId: areaId,
//           password: values.password,
//           status: "unused",
//           assignedTo: null,
//           assignedDate: null,
//           expiryDate: null,
//         });
//       }

//       // Add all passwords to Firestore
//       for (const newPassword of passwordsToCreate) {
//         await addDoc(passwordsCollectionRef, newPassword);
//       }

//       toast.success(
//         values.generateRandom
//           ? `${quantity} random passwords generated and added!`
//           : "Password added successfully!"
//       );

//       form.reset();
//       router.push(`/service-areas/${areaId}/passwords?tab=manage`);
//     } catch (error) {
//       console.error("Error adding password(s):", error);
//       toast.error("Failed to add password(s). Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Add Password</CardTitle>
//         <CardDescription>
//           Add a new password to this service area. You can add a single password or generate multiple random passwords.
//         </CardDescription>
//       </CardHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <CardContent className="space-y-4">
//             {/* <FormField
//               control={form.control}
//               name="generateRandom"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-base">Generate Random Passwords</FormLabel>
//                     <FormDescription>Automatically generate secure random passwords.</FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             /> */}

//             {!watchGenerateRandom ? (
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter a secure password" {...field} />
//                     </FormControl>
//                     <FormDescription>Create a strong password with at least 8 characters.</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             ) : (
//               <FormField
//                 control={form.control}
//                 name="quantity"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Number of Passwords</FormLabel>
//                     <FormControl>
//                       <Input type="number" min="1" max="100" {...field} />
//                     </FormControl>
//                     <FormDescription>How many random passwords to generate (max 100).</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => router.push(`/service-areas/${areaId}/passwords?tab=manage`)}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               {watchGenerateRandom ? "Generate Passwords" : "Add Password"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Form>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Key } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/api/firebase";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // Changed from Input to Textarea
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  passwords: z.string().min(8, { // Changed 'password' to 'passwords'
    message: "Each password must be at least 8 characters.",
  }),
});

export function AddPasswordForm({ areaId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwords: "", // Changed 'password' to 'passwords'
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const passwordsCollectionRef = collection(db, "passwords");
      const passwordsToCreate = [];

      // Split the input by commas or new lines to get individual passwords
      const inputPasswords = values.passwords
        .split(/[\n,]+/)
        .map((p) => p.trim())
        .filter((p) => p.length >= 8); // Only process valid passwords

      if (inputPasswords.length === 0) {
        toast.error("Please enter at least one valid password (minimum 8 characters).");
        setIsLoading(false);
        return;
      }

      for (const password of inputPasswords) {
        passwordsToCreate.push({
          areaId: areaId,
          password: password,
          status: "available",
          assignedTo: null,
          assignedDate: null,
          expiryDate: null,
        });
      }

      // Add all passwords to Firestore
      for (const newPassword of passwordsToCreate) {
        await addDoc(passwordsCollectionRef, newPassword);
      }

      toast.success(`${passwordsToCreate.length} password(s) added successfully!`);

      form.reset();
      router.push(`/service-areas/${areaId}/passwords?tab=manage`);
    } catch (error) {
      console.error("Error adding password(s):", error);
      toast.error("Failed to add password(s). Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Password(s)</CardTitle>
        <CardDescription>
          Add one or more passwords to this service area. Enter multiple passwords separated by commas or new lines.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="passwords" // Changed 'password' to 'passwords'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwords</FormLabel>
                  <FormControl>
                    <Textarea // Changed Input to Textarea
                      placeholder="Enter passwords separated by commas or new lines"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter one or more passwords, each at least 8 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/service-areas/${areaId}/passwords?tab=manage`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Passwords
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}