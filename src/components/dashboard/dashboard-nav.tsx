"use client";

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { navItems } from "@/constants/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideProps } from "lucide-react";
import { Icons } from "../icons";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const icons: {
    [key: string]: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  } = Icons;
  const path = usePathname();

  const renderNavItems = navItems.map((item, i) => {
    const Icon = icons[item.icon || "arrowRight"];
    return (
      item.href && (
        <Link
          key={i}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            {
              "bg-muted text-primary": path === item.href,
            }
          )}
        >
          <Icon className="h-4 w-4" />
          {item.title}
        </Link>
      )
    );
  });
  return (
    <nav className="px-2 text-sm font-medium lg:px-4 p-4">{renderNavItems}</nav>
  );
};

export default DashboardNav;
