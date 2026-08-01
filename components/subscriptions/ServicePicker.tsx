"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { POPULAR_SERVICES, getServiceLogo } from "@/lib/popular-services";

type Props = {
  onSelect: (service: { name: string; domain: string; category: string }) => void;
};

export function ServicePicker({ onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POPULAR_SERVICES;
    return POPULAR_SERVICES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Netflix, Spotify, ChatGPT..."
          className="pl-9 border-[#ebebeb]"
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {filtered.map((service) => (
          <button
            key={service.domain + service.name}
            type="button"
            onClick={() => onSelect(service)}
            className="flex flex-col items-center gap-2 rounded-xl border border-[#ebebeb] bg-white p-3 hover:border-[#171717] hover:bg-[#fafafa] transition-colors text-center"
          >
            <img
              src={getServiceLogo(service.domain)}
              alt={service.name}
              className="w-10 h-10 rounded-lg object-contain bg-[#f2f2f2]"
            />
            <span className="text-xs font-medium text-[#171717] line-clamp-2">
              {service.name}
            </span>
          </button>
        ))}

        {/* Custom option always visible */}
        <button
          type="button"
          onClick={() =>
            onSelect({ name: query || "Custom", domain: "", category: "Other" })
          }
          className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#d4d4d4] bg-white p-3 hover:border-[#171717] transition-colors text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-[#f2f2f2] flex items-center justify-center text-lg text-[#8f8f8f]">
            +
          </div>
          <span className="text-xs font-medium text-[#171717]">Custom</span>
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-[#8f8f8f] text-center py-6">
          No matches. Use <strong>Custom</strong> to add manually.
        </p>
      )}
    </div>
  );
}