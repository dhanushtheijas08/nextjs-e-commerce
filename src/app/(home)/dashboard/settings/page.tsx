import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import img from "@/image.png";
import UserSettings from "./user-settings";
import type { UserSession } from "@/types/types";
import Image from "next/image";

const SettingsPage = async () => {
  // const user = await auth();
  // if (!user) {
  //   toast.error("You need to be logged in to access this page");
  //   redirect("auth/login");
  // }

  // const userInfo: UserSession = {
  //   id: user.user.id,
  //   name: user.user.name!,
  //   email: user.user.email!,
  //   image: user.user.image,
  //   emailVerified: user.user.emailVerified!,
  //   isOAuth: user.user.isOAuth!,
  //   role: user.user.role,
  // };
  return (
    <div className="grid grid-cols-3 gap-5 overflow-y-auto h-screen">
      {Array.from({ length: 10 }).map((_, i) => (
        <>
          <div className="h-80 w-64" key={i}>
            <Image
              src={img}
              alt="img"
              height={200}
              width={200}
              className="size-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default SettingsPage;
