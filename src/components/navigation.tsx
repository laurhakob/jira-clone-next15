
// update a arel groky settings i hamar

"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useSearchParams } from "next/navigation";

export const Navigation = () => {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const routes = [
    {
      label: "Home",
      href: workspaceId ? `/?workspaceId=${workspaceId}` : "/",
      icon: GoHome,
      activeIcon: GoHomeFill,
    },
    {
      label: "My Tasks",
      href: "/tasks",
      icon: GoCheckCircle,
      activeIcon: GoCheckCircleFill,
    },
    {
      label: "Settings",
      href: workspaceId ? `/settings?workspaceId=${workspaceId}` : "/settings",
      icon: SettingsIcon,
      activeIcon: SettingsIcon,
    },
    {
  label: "Members",
  href: workspaceId ? `/members?workspaceId=${workspaceId}` : "/members",
  icon: UsersIcon,
  activeIcon: UsersIcon,
}
  ];

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false; // You can enhance this with usePathname if needed
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};