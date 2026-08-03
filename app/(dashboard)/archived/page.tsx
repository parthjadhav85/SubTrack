import { getArchivedSubscriptions, restoreSubscription, deleteSubscription } from "@/lib/subscription-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ArchivedPage() {
  const subscriptions = await getArchivedSubscriptions();

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Archived</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paused subscriptions — restore or delete them
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-16 text-center">
          <p className="font-medium mb-1">No archived subscriptions</p>
          <p className="text-sm text-muted-foreground">
            Paused items will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {sub.logo_url ? (
                  <img
                    src={sub.logo_url}
                    alt={sub.name}
                    className="w-10 h-10 rounded-lg object-contain bg-muted shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-semibold shrink-0">
                    {sub.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{sub.name}</h3>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {sub.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {sub.category} · {sub.billing_cycle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <p className="font-medium text-sm">
                  {formatINR(Number(sub.amount))}
                </p>
                <form action={restoreSubscription.bind(null, sub.id)}>
                  <Button type="submit" variant="outline" size="sm">
                    Restore
                  </Button>
                </form>
                <form action={deleteSubscription.bind(null, sub.id)}>
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
          ))}
        </div>
      )}
    </div>
  );
}