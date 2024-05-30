import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  showSocialLogin?: boolean;
};
const AuthCard = ({
  cardTitle,
  cardDescription,
  children,
  showSocialLogin,
}: AuthCardProps) => {
  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
