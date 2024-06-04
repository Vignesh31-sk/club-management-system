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
import { createMember } from "@/lib/createMember";

const schema = z.object({
  SRN: z.string().min(1, "SRN is required"),
  Name: z.string().min(3, "Name is Required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
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
      SRN: "",
      Name: "",
      email: "",
      semester: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      console.log(values);
      const response = await createMember(values, club_id);
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
                        placeholder="R22EI023"
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
                name="Name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Name" className="text-right">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        id="Name"
                        placeholder="Vignesh S"
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
                        placeholder="vignesh31.sk@gmail.com"
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
                        placeholder="4"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-right" />
                  </FormItem>
                )}
              />
            </div>
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
