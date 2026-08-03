import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, BarChart3, Shield, Download } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-foreground text-background flex items-center justify-center font-semibold text-sm">
              S
            </div>
            <span className="font-semibold tracking-tight">SubTrack</span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase mb-4 font-mono">
          Subscription intelligence
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-2xl">
          Track all your subscriptions in one place.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Never miss a payment. Get reminders, understand spending, and stay in
          control of every recurring charge.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup">
            <Button className="rounded-full h-11 px-6">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="rounded-full h-11 px-6">
              Log in
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Feature
            icon={<Bell className="w-4 h-4" />}
            title="Payment reminders"
            description="Know before you're charged. Stay ahead of renewals."
          />
          <Feature
            icon={<BarChart3 className="w-4 h-4" />}
            title="Spending insights"
            description="See monthly totals and where your money goes."
          />
          <Feature
            icon={<Shield className="w-4 h-4" />}
            title="Private by design"
            description="Your data stays yours — secured with auth and RLS."
          />
          <Feature
            icon={<Download className="w-4 h-4" />}
            title="Export anytime"
            description="Download your subscription list when you need it."
          />
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 SubTrack</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="w-9 h-9 rounded-md border border-border bg-background flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}