"use client";

import { Bell, Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function onSearch(value: string) {
    setQuery(value);

    // Only filter on subscriptions page
    if (!pathname.startsWith("/subscriptions")) {
      if (value.trim()) {
        router.push(`/subscriptions?q=${encodeURIComponent(value.trim())}`);
      }
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set("q", value.trim());
    else params.delete("q");

    const status = params.get("status");
    const qs = params.toString();
    router.push(qs ? `/subscriptions?${qs}` : "/subscriptions");
  }

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search subscriptions..."
          className="pl-9 h-9 bg-background"
        />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium ml-1">
          P
        </div>
      </div>
    </header>
  );
}