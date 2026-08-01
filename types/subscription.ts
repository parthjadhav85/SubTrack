export type BillingCycle = "weekly" | "monthly" | "yearly" | "custom";
export type SubscriptionStatus = "active" | "paused" | "cancelled";

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  currency: string;
  billing_date: string;
  billing_cycle: BillingCycle;
  category: string;
  status: SubscriptionStatus;
  notes: string | null;
  logo_url: string | null;
  domain: string | null;
  next_billing_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInsert {
  name: string;
  amount: number;
  currency?: string;
  billing_date: string;
  billing_cycle: BillingCycle;
  category?: string;
  status?: SubscriptionStatus;
  notes?: string;
  logo_url?: string;
  domain?: string;
  next_billing_date?: string;
}