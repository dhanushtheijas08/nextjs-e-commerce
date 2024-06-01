import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialAuth from "./social-auth";

type AuthCardProps = {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  authCardType: "login" | "register" | "email-verification";
  showSocialLogin?: boolean;
};
const AuthCard = ({
  cardTitle,
  cardDescription,
  children,
  showSocialLogin,
  authCardType,
}: AuthCardProps) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      {showSocialLogin && (
        <CardFooter className="flex flex-col w-full items-stretch gap-4 pb-4">
          <SocialAuth />
        </CardFooter>
      )}
      <CardContent>{children}</CardContent>

      {authCardType !== "email-verification" && (
        <CardFooter className="flex justify-center">
          {authCardType === "login" ? (
            <>
              <span className="text-muted-foreground">
                {`Don't`} have an account?
              </span>
              <Link
                href="/auth/register"
                className="ml-1 underline text-card-foreground"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-muted-foreground">Already an user?</span>
              <Link
                href="/auth/login"
                className="ml-1 underline text-card-foreground"
              >
                Login
              </Link>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
