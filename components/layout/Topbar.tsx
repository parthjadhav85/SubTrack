"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="h-14 border-b border-[#ebebeb] bg-white flex items-center justify-between px-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
        <Input
          placeholder="Search subscriptions..."
          className="pl-9 h-9 bg-[#fafafa] border-[#ebebeb] focus-visible:ring-[#171717]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-[#4d4d4d]">
          <Bell className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs font-medium">
          P
        </div>
      </div>
    </header>
  );
}