import Link from "next/link";
import { auth } from "@/lib/auth";

import ToogleButton from "@/components/toogle-button";
import { Button } from "@/components/ui/button";

import Logo from "./logo";
import UserProfile from "./user-profile";
import { LogIn } from "lucide-react";

const NavBar = async () => {
  const session = await auth();
  return (
    <header className="flex justify-between items-center backdrop-blur-md px-5 py-2 border-t-2 sticky top-0 z-50 border-b border-accent">
      <Logo />
      <nav>
        <ul className="flex items-center gap-5">
          {session?.user ? (
            <>
              <UserProfile
                email={session.user.email!}
                image={session.user.image!}
                name={session.user.name!}
                key={session.user.id!}
              />
              <ToogleButton />
            </>
          ) : (
            <Button asChild variant="outline" className="">
              <Link href="/auth/login">
                <LogIn className="w-4 h-4 mr-2" /> Login
              </Link>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
