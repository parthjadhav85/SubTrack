import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, BarChart3, Shield, Download } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-semibold text-lg">SubTrack</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900">How it Works</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700 mb-6">
            Manage Smarter, Save Better
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Track all your subscriptions in{" "}
            <span className="text-teal-600">one place.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Never miss a payment again. Get reminders, analyze spending, and take control of your recurring expenses.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Get Started for Free
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>✓ No credit card required</span>
            <span>✓ Free to start</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Bell className="w-5 h-5" />}
              title="Payment Reminders"
              description="Get notified before any payment due date so you never get surprised."
            />
            <FeatureCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="Spending Analytics"
              description="Visualize your spending and find ways to save money."
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Secure & Private"
              description="Your data is encrypted and always stays private."
            />
            <FeatureCard
              icon={<Download className="w-5 h-5" />}
              title="Export Data"
              description="Download your subscription data anytime in CSV format."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 SubTrack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms & Conditions</a>
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
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}