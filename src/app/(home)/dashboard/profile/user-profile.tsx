"use client";
import { userProfileAction } from "@/actions/userProfileAction";
import Heading from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { UserProfileType, userProfileSchema } from "@/schema/userProfileSchema";
import { UserSession } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type UserProfileProps = {
  user: UserSession;
};
const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();

  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState({
    imageFile: "",
    imageUrl: "",
  });
  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: "",
      newPassword: "",
    },
  });
  // const imageUpload = () => {
  //   console.log("hi");
  //   imageRef.current?.click();

  //   if (!imageRef.current) return;
  //   imageRef.current.click();
  // };

  const { execute, status } = useAction(userProfileAction, {
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message);
        router.push("/dashboard/profile");
        router.refresh();
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    },
  });
  const onSubmit = (values: UserProfileType) => {
    const userValues = {
      id: user.id,
      name: values.name,
      email: values.email,
      oldPassword: values.newPassword,
      newPassword: values.newPassword,
      imgUrl: image.imageUrl,
    };
    execute(userValues);
  };
  return (
    <div className="space-y-5 flex flex-col py-5">
      <Heading className="pl-10">Profile</Heading>
      <Form {...form}>
        {/* <div className="relative w-fit" onClick={imageUpload}>
          <input
            type="image"
            name="image"
            className="hidden"
            ref={imageRef}
            onChange={(e) => {
              console.log(e.target.files);
            }}
          />
          <Avatar className="h-36 w-36 cursor-pointer">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-4xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="absolute text-xs flex items-center gap-2 bottom-1 right-0 py-1 px-2.5 bg-accent/80 rounded-sm">
            <Edit className="h-3 w-3" />
            Edit
          </span>
        </div> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 pl-10 max-w-lg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sara"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sara@gmail.com"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="You Old Password"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Never forget you"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === "executing" ? true : false}>
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserProfile;
