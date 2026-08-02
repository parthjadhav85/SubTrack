"use client";

import { Subscription } from "@/types/subscription";
import { Badge } from "@/components/ui/badge";
import {
  deleteSubscription,
  pauseSubscription,
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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#ebebeb] bg-white px-5 py-4">
      <div className="flex items-center gap-4 min-w-0">
        {subscription.logo_url ? (
          <img
            src={subscription.logo_url}
            alt={subscription.name}
            className="w-10 h-10 rounded-lg object-contain bg-[#f2f2f2] shrink-0"
            onError={(e) => {
              const img = e.currentTarget;
              if (subscription.domain && !img.dataset.fallback) {
                img.dataset.fallback = "1";
                img.src = `https://www.google.com/s2/favicons?domain=${subscription.domain}&sz=128`;
              } else {
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }
            }}
          />
        ) : null}

        <div
          className="w-10 h-10 rounded-lg bg-[#f2f2f2] flex items-center justify-center text-sm font-semibold text-[#171717] shrink-0"
          style={{ display: subscription.logo_url ? "none" : "flex" }}
        >
          {subscription.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-[#171717] truncate">
              {subscription.name}
            </h3>
            <Badge
              variant="secondary"
              className="text-xs font-normal capitalize bg-[#f2f2f2] text-[#4d4d4d]"
            >
              {subscription.status}
            </Badge>
          </div>
          <p className="text-sm text-[#8f8f8f] mt-0.5">
            {subscription.category} · {subscription.billing_cycle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <p className="font-medium text-[#171717]">{amountFormatted}</p>
          <p className="text-xs text-[#8f8f8f]">
            Next: {subscription.next_billing_date || subscription.billing_date}
          </p>
        </div>

        {subscription.status === "active" && (
          <form action={pauseSubscription.bind(null, subscription.id)}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="rounded-md border-[#ebebeb]"
            >
              Pause
            </Button>
          </form>
        )}

        <form action={deleteSubscription.bind(null, subscription.id)}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="rounded-md border-[#ebebeb] text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}