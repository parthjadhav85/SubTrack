import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubscriptions } from "@/lib/subscription-actions";
import { SubscriptionCard } from "@/components/subscriptions/SubscriptionCard";

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions();
  const active = subscriptions.filter((s) => s.status === "active");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Subscriptions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {active.length} active subscription
            {active.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/subscriptions/new">
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      {subscriptions.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <p className="font-medium mb-1">No subscriptions yet</p>
          <p className="text-sm text-muted-foreground mb-6">
            Add your first subscription to start tracking.
          </p>
          <Link href="/subscriptions/new">
            <Button className="rounded-full">Add Subscription</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))}
        </div>
      )}
    </div>
  );
}