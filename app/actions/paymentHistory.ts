"use server";

import { createClient } from "@/utils/supabase/server";
import { updateAPIUsage } from "./updateApiUsage";

export async function getPaymentHistory({
  workspace_id,
}: {
  workspace_id: string;
}) {
  const supabase = await createClient();

  const { data: paymentData } = await supabase
    .from("payment")
    .select("id,order_id, payment_id, amount, expDate, payment_date, status")
    .eq("workspace_id", workspace_id)
    .order("expDate", { ascending: false });

  if (!paymentData) {
    return {
      error: "No Payment History Found",
    };
  } else {
    // console.log(paymentData);

    const today = new Date();
    const expDate = new Date(paymentData[0].expDate);
    const { error } = await updateAPIUsage({ workspace_id: workspace_id });
    if (error) {
      return error;
    }

    return {
      plan: today <= expDate ? "Pro" : "Free",
      plan_expires_at: expDate,
      payments: paymentData,
    };
  }
}
