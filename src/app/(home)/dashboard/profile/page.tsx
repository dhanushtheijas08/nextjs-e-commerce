import { auth } from "@/lib/auth";
import type { UserSession } from "@/types/types";
import UserProfile from "./user-profile";
const ProfilePage = async () => {
  const user = await auth();
  if (!user) return;
  const userInfo: UserSession = {
    id: user.user.id,
    name: user.user.name!,
    email: user.user.email!,
    image: user.user.image,
    emailVerified: user.user.emailVerified!,
    isOAuth: user.user.isOAuth!,
    role: user.user.role,
  };
  return (
    <section className="p-2">
      <UserProfile user={userInfo} />
    </section>
  );
};

export default ProfilePage;
