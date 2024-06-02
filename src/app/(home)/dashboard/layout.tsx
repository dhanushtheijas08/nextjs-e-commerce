import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import DashboardNav from "@/components/dashboard/dashboard-nav";
type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="hidden md:block w-[220px] lg:w-[280px] h-full border-r overflow-y-auto">
        <div className="flex flex-col h-full">
          <DashboardNav />

          <div className="mt-auto mb-14 p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 mb-14">{children}</ScrollArea>
    </div>
  );
};

export default DashboardLayout;
