import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import NavBar from "@/components/navigation/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = async ({ children }: MainLayoutProps) => {
  // const user = await auth();
  // if (!user) {
  //   redirect("auth/login");
  // }
  return (
    <main className="overflow-y-hidden h-screen">
      <NavBar />
      {children}
    </main>
  );
};

export default MainLayout;
