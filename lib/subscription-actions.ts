"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SubscriptionInsert } from "@/types/subscription";

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
    next_billing_date: billing_date,
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