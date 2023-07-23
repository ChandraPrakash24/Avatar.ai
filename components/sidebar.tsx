"use client";

import Link from "next/link";
import { Home, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const routes = [
  {
    icon: Home,
    href: '/',
    label: "Home"
  },
  {
    icon: Plus,
    href: '/create',
    label: "Create"
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 flex flex-col h-full bg-secondary text-white">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
