"use client";

import { useState } from "react";
import Link from "next/link";
import { createSubscription } from "@/lib/subscription-actions";
import { ServicePicker } from "@/components/subscriptions/ServicePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServiceLogo } from "@/lib/popular-services";

const CATEGORIES = [
  "Entertainment",
  "Music",
  "Productivity",
  "Cloud Storage",
  "Education",
  "Utilities",
  "Health & Fitness",
  "News",
  "Gaming",
  "Other",
];

type SelectedService = {
  name: string;
  domain: string;
  category: string;
};

export default function NewSubscriptionPage() {
  const [selected, setSelected] = useState<SelectedService | null>(null);

  if (!selected) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link
            href="/subscriptions"
            className="text-sm text-[#8f8f8f] hover:text-[#171717]"
          >
            ← Back to subscriptions
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-[#171717] mt-2">
            Add Subscription
          </h1>
          <p className="text-sm text-[#8f8f8f] mt-1">
            Pick a service or search to continue
          </p>
        </div>

        <Card className="border-[#ebebeb] shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Choose a service</CardTitle>
            <CardDescription>
              Search and select from popular apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServicePicker onSelect={setSelected} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="text-sm text-[#8f8f8f] hover:text-[#171717]"
        >
          ← Change service
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-[#171717] mt-2">
          Subscription details
        </h1>
      </div>

      <Card className="border-[#ebebeb] shadow-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            {selected.domain ? (
              <img
                src={getServiceLogo(selected.domain)}
                alt={selected.name}
                className="w-10 h-10 rounded-lg bg-[#f2f2f2]"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#f2f2f2] flex items-center justify-center font-semibold">
                {selected.name.charAt(0)}
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{selected.name}</CardTitle>
              <CardDescription>{selected.category}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={createSubscription} className="space-y-5">
            {/* Hidden fields for name/category/domain/logo */}
            <input type="hidden" name="name" value={selected.name} />
            <input type="hidden" name="category" value={selected.category} />
            <input type="hidden" name="domain" value={selected.domain} />
            <input
              type="hidden"
              name="logo_url"
              value={selected.domain ? getServiceLogo(selected.domain) : ""}
            />

            {selected.name === "Custom" || !selected.domain ? (
              <div className="space-y-2">
                <Label htmlFor="name_override">Service name</Label>
                <Input
                  id="name_override"
                  name="name"
                  placeholder="Enter service name"
                  required
                  className="border-[#ebebeb]"
                  defaultValue=""
                />
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="649"
                  required
                  className="border-[#ebebeb]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing_cycle">Billing cycle</Label>
                <select
                  id="billing_cycle"
                  name="billing_cycle"
                  required
                  defaultValue="monthly"
                  className="flex h-9 w-full rounded-md border border-[#ebebeb] bg-white px-3 text-sm"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billing_date">Next billing date</Label>
                <Input
                  id="billing_date"
                  name="billing_date"
                  type="date"
                  required
                  className="border-[#ebebeb]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_select">Category</Label>
                <select
                  id="category_select"
                  name="category"
                  defaultValue={selected.category}
                  className="flex h-9 w-full rounded-md border border-[#ebebeb] bg-white px-3 text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                name="notes"
                placeholder="Family plan, shared with..."
                className="border-[#ebebeb]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="rounded-full bg-[#171717] hover:bg-black text-white"
              >
                Save Subscription
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-[#ebebeb]"
                onClick={() => setSelected(null)}
              >
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}