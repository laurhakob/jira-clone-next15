"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

export const Navigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const routes = [
    {
      label: "Home",
      path: "/",
      href: workspaceId ? `/?workspaceId=${workspaceId}` : "/",
      icon: GoHome,
      activeIcon: GoHomeFill,
    },
    {
      label: "My Tasks",
      path: "/tasks",
      href: workspaceId ? `/tasks?workspaceId=${workspaceId}` : "/tasks",
      icon: GoCheckCircle,
      activeIcon: GoCheckCircleFill,
    },
    {
      label: "Settings",
      path: "/settings",
      href: workspaceId ? `/settings?workspaceId=${workspaceId}` : "/settings",
      icon: SettingsIcon,
      activeIcon: SettingsIcon,
    },
    {
      label: "Members",
      path: "/members",
      href: workspaceId ? `/members?workspaceId=${workspaceId}` : "/members",
      icon: UsersIcon,
      activeIcon: UsersIcon,
    },
  ];

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = pathname === item.path;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
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
