
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase"; 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast"; 
import { Loader2 } from "lucide-react"; // For loading indicator

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Service area name must be at least 2 characters.",
  }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  description: z.string().optional(),
  coordinates: z.string().optional(),
});

export function AddServiceAreaDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      coordinates: "",
     
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const serviceAreasCollectionRef = collection(db, "serviceAreas"); // Create a 'serviceAreas' collection
      await addDoc(serviceAreasCollectionRef, values);
      toast.success({
       
        title: "Success!",
        description: "Service area created successfully.",
      });
      form.reset();
      window.location.reload(); // Reload the page to reflect changes
      setOpen(false);
      router.refresh(); // Re-fetch server components
    } catch (error) {
      console.error("Error creating service area:", error);
      toast.error({
      
        title: "Error!",
        description: "Failed to create service area. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <MapPin className="mr-2 h-4 w-4" />
          Add New Area
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Service Area</DialogTitle>
          <DialogDescription>
            Create a new Starlink service area for your customers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown Station" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this service area.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Downtown" {...field} />
                  </FormControl>
                  <FormDescription>
                    The physical address of this service area.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the service area and any special notes..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPS Coordinates (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="40.7128° N, 74.0060° W" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Service Area
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
