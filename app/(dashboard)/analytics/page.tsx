"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardData = {
  monthlyTotal: number;
  yearlyTotal: number;
  activeCount: number;
  categoryBreakdown: { name: string; value: number }[];
};

const COLORS = [
  "#171717",
  "#525252",
  "#737373",
  "#a3a3a3",
  "#d4d4d4",
  "#404040",
  "#262626",
];

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!data || data.activeCount === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Insights from your subscriptions
          </p>
        </div>
        <Card className="border-border shadow-none">
          <CardContent className="py-16 text-center">
            <p className="font-medium mb-1">No data yet</p>
            <p className="text-sm text-muted-foreground">
              Add subscriptions to see analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Insights from your subscriptions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border shadow-none">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Monthly spend</p>
            <p className="text-2xl font-semibold">
              {formatINR(data.monthlyTotal)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Yearly projection</p>
            <p className="text-2xl font-semibold">
              {formatINR(data.yearlyTotal)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Active</p>
            <p className="text-2xl font-semibold">{data.activeCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie */}
        <Card className="border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Spend by category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {data.categoryBreakdown.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatINR(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {data.categoryBreakdown.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  {c.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card className="border-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Category comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatINR(Number(value))} />
                  <Bar
                    dataKey="value"
                    fill="#171717"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}