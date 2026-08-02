import Link from "next/link";
import { getDashboardData } from "@/lib/subscription-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, Calendar, TrendingUp, Wallet } from "lucide-react";

export default async function DashboardPage() {
  const data = await getDashboardData();

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your subscription spending
          </p>
        </div>
        <Link href="/subscriptions/new">
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Monthly spend"
          value={formatINR(data.monthlyTotal)}
          icon={<Wallet className="w-4 h-4" />}
        />
        <KpiCard
          title="Yearly projection"
          value={formatINR(data.yearlyTotal)}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <KpiCard
          title="Active subscriptions"
          value={String(data.activeCount)}
          icon={<CreditCard className="w-4 h-4" />}
        />
        <KpiCard
          title="Due in 7 days"
          value={String(data.upcomingCount)}
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming */}
        <Card className="border-border shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Upcoming payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No payments due in the next 7 days
              </p>
            ) : (
              <div className="space-y-3">
                {data.upcoming.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {s.logo_url ? (
                        <img
                          src={s.logo_url}
                          alt={s.name}
                          className="w-8 h-8 rounded-md bg-muted object-contain"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs font-semibold">
                          {s.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.next_billing_date}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium shrink-0">
                      {formatINR(Number(s.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="border-border shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Spending by category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.categoryBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Add subscriptions to see breakdown
              </p>
            ) : (
              <div className="space-y-3">
                {data.categoryBreakdown.map((c) => {
                  const pct =
                    data.monthlyTotal > 0
                      ? Math.round((c.value / data.monthlyTotal) * 100)
                      : 0;
                  return (
                    <div key={c.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>{c.name}</span>
                        <span className="text-muted-foreground">
                          {formatINR(c.value)} · {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-foreground/80"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent */}
      <Card className="border-border shadow-none">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">
            Recent subscriptions
          </CardTitle>
          <Link
            href="/subscriptions"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {data.recent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">
                No subscriptions yet
              </p>
              <Link href="/subscriptions/new">
                <Button className="rounded-full">Add your first</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recent.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {s.logo_url ? (
                      <img
                        src={s.logo_url}
                        alt={s.name}
                        className="w-8 h-8 rounded-md bg-muted object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs font-semibold">
                        {s.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">
                      {formatINR(Number(s.amount))}
                    </p>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {s.billing_cycle}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}