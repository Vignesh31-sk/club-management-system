"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Member, updateMember } from "@/lib/members";
import { Club, getClubs } from "@/lib/clubs";

const schema = z.object({
  SRN: z.string(),
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  mobile: z.string().min(13, "Invalid Number!"),
  membership: z.number(),
  semester: z
    .number()
    .min(1, "Semester must be at least 1")
    .max(8, "Semester must be at most 8"),
});

export default function Update({
  member,
  triggerUpdate,
}: {
  member: Member;
  triggerUpdate: React.RefObject<HTMLButtonElement>;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      SRN: member.SRN,
      name: member.name,
      email: member.email,
      mobile: member.mobile,
      membership: member.membership,
      semester: member.semester,
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const formData = new FormData();
      formData.append("SRN", member.SRN);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("semester", values.semester.toString());
      formData.append("membership", values.membership.toString());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      console.log(formData);
      const promise = await updateMember(formData, member);
      toast({
        title: promise?.tittle,
        description: promise?.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }

  let [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getClubs()
      .then((data: Club[]) => {
        setClubs(data);
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: e?.message,
        });
      });
    console.log(clubs);
  }, []);

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
              <SheetTitle>Edit member {member.name}</SheetTitle>
              <SheetDescription>
                Make changes to this profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
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
                        placeholder={member.name}
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
                        placeholder={member.email}
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
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        id="mobile"
                        placeholder={member.mobile}
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
                name="membership"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="membership" className="text-right">
                      Club
                    </Label>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Club " />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clubs.map((club: any) => (
                          <SelectItem key={club.id} value={club.id.toString()}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        placeholder={member.semester.toString()}
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
