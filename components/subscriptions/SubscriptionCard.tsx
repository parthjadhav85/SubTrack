"use client";

import { Subscription } from "@/types/subscription";
import { Badge } from "@/components/ui/badge";
import {
  deleteSubscription,
  pauseSubscription,
  restoreSubscription,
} from "@/lib/subscription-actions";
import { Button } from "@/components/ui/button";

export function SubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  const amountFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: subscription.currency || "INR",
    maximumFractionDigits: 0,
  }).format(Number(subscription.amount));

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4">
      <div className="flex items-center gap-4 min-w-0">
        {subscription.logo_url ? (
          <img
            src={subscription.logo_url}
            alt={subscription.name}
            className="w-10 h-10 rounded-lg object-contain bg-muted shrink-0"
            onError={(e) => {
              const img = e.currentTarget;
              if (subscription.domain && !img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src = `https://www.google.com/s2/favicons?domain=${subscription.domain}&sz=128`;
              } else {
                img.style.display = "none";
              }
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold shrink-0">
            {subscription.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{subscription.name}</h3>
            <Badge variant="secondary" className="text-xs font-normal capitalize">
              {subscription.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {subscription.category} · {subscription.billing_cycle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
  <div className="text-right mr-1">
    <p className="font-medium">{amountFormatted}</p>
    <p className="text-xs text-muted-foreground">
      Next: {subscription.next_billing_date || subscription.billing_date}
    </p>
  </div>

  {subscription.status === "active" ? (
    <form action={pauseSubscription.bind(null, subscription.id)}>
      <Button type="submit" variant="outline" size="sm">
        Pause
      </Button>
    </form>
  ) : (
    <form action={restoreSubscription.bind(null, subscription.id)}>
      <Button type="submit" variant="outline" size="sm">
        Restore
      </Button>
    </form>
  )}

  <form action={deleteSubscription.bind(null, subscription.id)}>
    <Button
      type="submit"
      variant="outline"
      size="sm"
      className="text-destructive hover:text-destructive"
    >
      Delete
    </Button>
  </form>
</div>
    </div>
  );
}