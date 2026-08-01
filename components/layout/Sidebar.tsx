"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Archive,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Archived", href: "/archived", icon: Archive },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-[#ebebeb] bg-white">
      <div className="flex items-center gap-2 px-5 h-14 border-b border-[#ebebeb]">
        <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-white font-semibold text-sm">
          S
        </div>
        <span className="font-semibold tracking-tight text-[#171717]">SubTrack</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-[#f2f2f2] text-[#171717] font-medium"
                  : "text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-[#ebebeb]">
        <p className="text-xs text-[#a1a1a1] font-mono">v1.0.0</p>
      </div>
    </aside>
  );
}