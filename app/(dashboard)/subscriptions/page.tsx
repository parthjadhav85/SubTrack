import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubscriptions } from "@/lib/subscription-actions";
import { SubscriptionCard } from "@/components/subscriptions/SubscriptionCard";
import { cn } from "@/lib/utils";

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status || "active";
  const q = (params.q || "").trim().toLowerCase();

  const all = await getSubscriptions();

  let list = all;
  if (status === "active") list = all.filter((s) => s.status === "active");
  if (status === "paused") list = all.filter((s) => s.status === "paused");

  if (q) {
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.category || "").toLowerCase().includes(q)
    );
  }

  const counts = {
    all: all.length,
    active: all.filter((s) => s.status === "active").length,
    paused: all.filter((s) => s.status === "paused").length,
  };

  const tabs = [
    { key: "active", label: "Active", count: counts.active },
    { key: "paused", label: "Paused", count: counts.paused },
    { key: "all", label: "All", count: counts.all },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Subscriptions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your recurring payments
          </p>
        </div>
        <Link href="/subscriptions/new">
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => {
          const active = status === tab.key;
          const href =
            tab.key === "active"
              ? "/subscriptions"
              : `/subscriptions?status=${tab.key}`;

          return (
            <Link
              key={tab.key}
              href={href}
              className={cn(
                "px-3 py-2 text-sm border-b-2 -mb-px transition-colors",
                active
                  ? "border-foreground text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <p className="font-medium mb-1">
            {status === "paused"
              ? "No paused subscriptions"
              : q
                ? "No matches found"
                : "No subscriptions yet"}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {status === "paused"
              ? "Paused items will show up here."
              : q
                ? "Try a different search term."
                : "Add your first subscription to start tracking."}
          </p>
          {!q && status !== "paused" && (
            <Link href="/subscriptions/new">
              <Button className="rounded-full">Add Subscription</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))}
        </div>
      )}
    </div>
  );
}