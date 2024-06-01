import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBaseUrl } from "@/lib/utils";
import Link from "next/link";

const VerificationStatus = ({
  params,
}: {
  params: { verification: "pending" | "error" };
}) => {
  console.log(params.verification);

  return (
    <Card className="w-[450px] py-5">
      <CardHeader>
        <CardTitle className="text-center">
          {
            {
              pending: "Verify your email",
              error: "Error verifying email",
            }[params.verification]
          }
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          {
            {
              pending:
                "To start using the application, please verify your email.",
              error:
                "There was an error verifying your email. Please try to register again or contact support.",
            }[params.verification]
          }
        </p>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        {params.verification === "pending" && (
          <>
            <Button className="w-full" asChild variant="outline">
              <Link href={`${getBaseUrl()}/`}>Back To Home</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="https://mail.google.com/mail/" target="_blank">
                Open mail
              </Link>
            </Button>
          </>
        )}
        {params.verification === "error" && (
          <>
            <Button className="w-full" asChild variant="outline">
              <Link href="/auth/register">Back To Register</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href={`${getBaseUrl()}/contact-support`}>
                Contact Support
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default VerificationStatus;
