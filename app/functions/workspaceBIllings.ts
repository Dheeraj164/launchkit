/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";
import { updateAPIUsage } from "../actions/updateApiUsage";
import { WorkspaceBilling } from "../actions/getBillings";

export async function workspaceBillings({
  supabase,
  userId,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  userId: string;
}) {
  /* 1️⃣ Get user */

  /* 2️⃣ Get all owned workspaces */
  const { data: workspaces, error: workspaceError } = await supabase
    .from("workspaces")
    .select("id, name")
    .eq("owner", userId);

  if (workspaceError || !workspaces || workspaces.length === 0) {
    return { error: "No billing Details to Show", data: null };
  }

  await Promise.all(
    workspaces.map((workspace) =>
      updateAPIUsage({ workspace_id: workspace.id })
    )
  );

  /* 4️⃣ Get all payments */
  const workspaceIds = workspaces.map((w) => w.id);

  const { data: payments } = await supabase
    .from("payment")
    .select(
      "id, order_id, payment_id, amount, expDate, payment_date, status, workspace_id"
    )
    .in("workspace_id", workspaceIds)
    .order("expDate", { ascending: false });

  const today = new Date();

  /* 5️⃣ Build billing response */
  const billing: WorkspaceBilling[] = workspaces.map((workspace) => {
    const workspacePayments =
      payments?.filter((p) => p.workspace_id === workspace.id) ?? [];

    const latestPayment = workspacePayments[0];
    const expDate = latestPayment ? new Date(latestPayment.expDate) : null;

    return {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      plan: expDate && today <= expDate ? "Pro" : "Free",
      plan_expires_at: expDate,
      payments: workspacePayments,
    };
  });

  return { error: null, data: billing };
}
