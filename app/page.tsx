import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, BarChart3, Shield, Download } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      {/* Navbar */}
      <header className="border-b border-[#ebebeb] bg-[#fafafa]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-white font-semibold text-sm">
              S
            </div>
            <span className="font-semibold tracking-tight">SubTrack</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#4d4d4d]">
            <a href="#features" className="hover:text-[#171717] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-[#171717] transition-colors">
              How it Works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-md border-[#ebebeb]">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full bg-[#171717] hover:bg-black text-white px-4">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#8f8f8f] uppercase mb-4 font-mono">
            Subscription intelligence
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Track all your subscriptions in{" "}
            <span className="text-[#0070f3]">one place.</span>
          </h1>

          <p className="mt-6 text-lg text-[#4d4d4d] leading-relaxed max-w-xl">
            Never miss a payment again. Get reminders, analyze spending, and take
            control of your recurring expenses.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button className="rounded-full bg-[#171717] hover:bg-black text-white h-11 px-6">
                Get Started for Free
              </Button>
            </Link>
            <Button variant="outline" className="rounded-full border-[#ebebeb] h-11 px-6">
              See How It Works
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#8f8f8f]">
            <span>No credit card required</span>
            <span>·</span>
            <span>Free to start</span>
            <span>·</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[#ebebeb]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={<Bell className="w-4 h-4" />}
              title="Payment Reminders"
              description="Get notified before any payment due date so you never get surprised."
            />
            <FeatureCard
              icon={<BarChart3 className="w-4 h-4" />}
              title="Spending Analytics"
              description="Visualize your spending and find ways to save money."
            />
            <FeatureCard
              icon={<Shield className="w-4 h-4" />}
              title="Secure & Private"
              description="Your data is encrypted and always stays private."
            />
            <FeatureCard
              icon={<Download className="w-4 h-4" />}
              title="Export Data"
              description="Download your subscription data anytime in CSV format."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8f8f8f]">
          <p>© 2026 SubTrack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#171717]">Privacy</a>
            <a href="#" className="hover:text-[#171717]">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#ebebeb] p-6 hover:border-[#d4d4d4] transition-colors">
      <div className="w-9 h-9 rounded-md border border-[#ebebeb] bg-[#fafafa] flex items-center justify-center mb-4 text-[#171717]">
        {icon}
      </div>
      <h3 className="font-medium text-[#171717] mb-1.5">{title}</h3>
      <p className="text-sm text-[#4d4d4d] leading-relaxed">{description}</p>
    </div>
  );
}