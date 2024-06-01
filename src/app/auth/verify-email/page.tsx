import EmailVerification from "@/components/auth/email-verification";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerificationPage = () => {
  return (
    <Card className="max-w-[430px]">
      <CardHeader>
        <CardTitle className="text-center">Email Verification</CardTitle>
        <CardDescription className="text-center">
          Verification can take up to 30 - 60 seconds. Please be patient.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <EmailVerification />
      </CardContent>
    </Card>
  );
};
export default VerificationPage;
