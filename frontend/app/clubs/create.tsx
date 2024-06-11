"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMember } from "@/lib/members";
import { useState } from "react";

const schema = z.object({
  SRN: z.string().min(1, "SRN is required"),
  name: z.string().min(3, "Name is Required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  mobile: z.string().min(13, "Mobile number is required"),
  membership: z.number(),
  semester: z
    .number()
    .min(1, "Semester must be at least 1")
    .max(8, "Semester must be at most 8"),
});

export default function CreateMember({
  club_id,
  triggerUpdate,
}: {
  club_id: number;
  triggerUpdate: React.RefObject<HTMLButtonElement>;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      membership: club_id,
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const formData = new FormData();
      formData.append("SRN", values.SRN);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("semester", values.semester.toString());
      formData.append("membership", values.membership.toString());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      console.log(formData);
      const response = await createMember(formData);
      console.log(response);
      toast({
        title: response?.tittle,
        description: response?.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          ref={triggerUpdate}
          style={{ display: "none" }}
        >
          Update
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Edit member Vignesh S</SheetTitle>
              <SheetDescription>
                Make changes to this profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="SRN"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="SRN" className="text-right">
                      SRN
                    </Label>
                    <FormControl>
                      <Input
                        id="SRN"
                        placeholder="Enter your SRN"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter your Name"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mobile" className="text-right">
                      Mobile
                    </Label>
                    <FormControl>
                      <Input
                        id="mobile"
                        placeholder="Enter you Mobile number with country code"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="semester" className="text-right">
                      Semester
                    </Label>
                    <FormControl>
                      <Input
                        id="semester"
                        type="number"
                        className="col-span-3"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <br></br>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" disabled={!form.formState.isValid}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
