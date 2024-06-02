import { cn } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};
const Heading = ({ children, className }: HeadingProps) => {
  return <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;
};

export default Heading;
