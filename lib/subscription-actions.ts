"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SubscriptionInsert } from "@/types/subscription";

function getNextBillingDate(start: string, cycle: string): string {
  const d = new Date(start + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If start is today or in the past, move forward until it's in the future
  while (d <= today) {
    if (cycle === "weekly") {
      d.setDate(d.getDate() + 7);
    } else if (cycle === "monthly") {
      d.setMonth(d.getMonth() + 1);
    } else if (cycle === "yearly") {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      // custom
      if (d <= today) d.setDate(d.getDate() + 1);
      break;
    }
  }

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function getSubscriptions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function createSubscription(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const billing_date = formData.get("billing_date") as string;
  const billing_cycle = formData.get("billing_cycle") as string;
  const category = (formData.get("category") as string) || "Other";
  const notes = (formData.get("notes") as string) || null;
  const domain = (formData.get("domain") as string) || null;
  const logo_url = (formData.get("logo_url") as string) || null;

  const next_billing_date = getNextBillingDate(billing_date, billing_cycle);

  const payload: SubscriptionInsert & { user_id: string } = {
    user_id: user.id,
    name,
    amount,
    currency: "INR",
    billing_date,
    billing_cycle: billing_cycle as SubscriptionInsert["billing_cycle"],
    category,
    status: "active",
    notes: notes || undefined,
    domain: domain || undefined,
    logo_url: logo_url || undefined,
    next_billing_date,
  };

  const { error } = await supabase.from("subscriptions").insert(payload);

  if (error) {
    console.error(error);
    redirect("/subscriptions/new?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/subscriptions");
  revalidatePath("/dashboard");
  redirect("/subscriptions");
}

export async function deleteSubscription(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("subscriptions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/subscriptions");
  revalidatePath("/dashboard");
}

export async function pauseSubscription(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("subscriptions")
    .update({ status: "paused", updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/subscriptions");
  revalidatePath("/dashboard");
}

export async function getDashboardData() {
  const subscriptions = await getSubscriptions();
  const active = subscriptions.filter((s) => s.status === "active");

  const monthlyTotal = active.reduce((sum, s) => {
    const amount = Number(s.amount) || 0;
    if (s.billing_cycle === "yearly") return sum + amount / 12;
    if (s.billing_cycle === "weekly") return sum + amount * 4.33;
    return sum + amount;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const in7 = new Date(today);
  in7.setDate(in7.getDate() + 7);

  const upcoming = active
    .filter((s) => {
      if (!s.next_billing_date) return false;
      const d = new Date(s.next_billing_date + "T00:00:00");
      return d >= today && d <= in7;
    })
    .sort(
      (a, b) =>
        new Date(a.next_billing_date!).getTime() -
        new Date(b.next_billing_date!).getTime()
    )
    .slice(0, 5);

  const categoryMap: Record<string, number> = {};
  active.forEach((s) => {
    const cat = s.category || "Other";
    const amount = Number(s.amount) || 0;
    let monthly = amount;
    if (s.billing_cycle === "yearly") monthly = amount / 12;
    if (s.billing_cycle === "weekly") monthly = amount * 4.33;
    categoryMap[cat] = (categoryMap[cat] || 0) + monthly;
  });

  const categoryBreakdown = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);

  return {
    monthlyTotal: Math.round(monthlyTotal),
    yearlyTotal: Math.round(yearlyTotal),
    activeCount: active.length,
    upcomingCount: upcoming.length,
    upcoming,
    categoryBreakdown,
    recent: active.slice(0, 5),
  };
}
export async function restoreSubscription(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("subscriptions")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/subscriptions");
  revalidatePath("/archived");
  revalidatePath("/dashboard");
}

export async function getArchivedSubscriptions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "paused")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}