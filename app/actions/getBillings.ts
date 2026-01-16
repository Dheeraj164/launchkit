/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/utils/supabase/server";
import { updateAPIUsage } from "./updateApiUsage";

export type WorkspaceBilling = {
  workspaceId: string;
  workspaceName: string;
  plan: "Pro" | "Free";
  plan_expires_at: Date | null;
  payments: {
    id: any;
    order_id: any;
    payment_id: any;
    amount: any;
    expDate: any;
    payment_date: any;
    status: any;
  }[];
};

export async function getAllWorkspaceBilling(): Promise<{
  error: string | null;
  data: WorkspaceBilling[] | null;
}> {
  const supabase = await createClient();

  /* 1️⃣ Get user */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized", data: null };
  }

  /* 2️⃣ Get all owned workspaces */
  const { data: workspaces, error: workspaceError } = await supabase
    .from("workspaces")
    .select("id, name")
    .eq("owner", user.id);

  if (workspaceError || !workspaces || workspaces.length === 0) {
    return { error: "No billing Details to Show", data: null };
  }

  /* 3️⃣ Update API usage (proper async) */
  // await Promise.all(
  //   workspaces.map((workspace) =>
  //     updateAPIUsage({ workspace_id: workspace.id })
  //   )
  // );
  workspaces.forEach(async (workspace) => {
    const { error } = await updateAPIUsage({ workspace_id: workspace.id });
    if (error)
      return {
        error: error,
        data: null,
      };
  });

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
