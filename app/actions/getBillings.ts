/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createClient } from "@/utils/supabase/server";

// interface getBillingReturnType {
//   error: string | null;
//   plan: null | "Pro" | "Free";
//   plan_expires_at: null | Date;
//   payments:
//     | {
//         id: any;
//         order_id: any;
//         payment_id: any;
//         amount: any;
//         expDate: any;
//         payment_date: any;
//         status: any;
//       }[]
//     | null;
// }

// export async function getBilling(
//   workspaceId: string
// ): Promise<getBillingReturnType> {
//   const supabase = await createClient();
//   const user = (await supabase.auth.getUser()).data.user;
//   const { data: workspaceData, error: workspaceError } = await supabase
//     .from("workspaces")
//     .select("id")
//     .eq("owner", user?.id);
//   const { data: paymentData, error: paymentError } = await supabase
//     .from("payment")
//     .select("id,order_id, payment_id, amount, expDate, payment_date,status")
//     .eq("workspace_id", workspaceId)
//     .order("expDate", { ascending: false });

//   console.log(paymentError);
//   if (!paymentData || paymentError) {
//     return {
//       error: "No Payment History Found",
//       plan: null,
//       plan_expires_at: null,
//       payments: null,
//     };
//   } else {
//     // console.log(paymentData);

//     const today = new Date();
//     const expDate = new Date(paymentData[0].expDate);

//     return {
//       error: null,
//       plan: today <= expDate ? "Pro" : "Free",
//       plan_expires_at: expDate,
//       payments: paymentData,
//     };
//   }
// }

// export async function getWorkspace() {
//   const supabase = await createClient();
//   const user = (await supabase.auth.getUser()).data.user;
//   try {
//     const { data: workspaceData, error: workspaceError } = await supabase
//       .from("workspaces")
//       .select("id")
//       .eq("owner", user?.id);
//     if (workspaceError) throw new Error("WORKSPACES_NOT_FOUND");
//     return { workspaceData: workspaceData };
//   } catch (e) {
//     throw new Error("WORKSPACES_NOT_FOUND");
//   }
// }

"use server";

import { createClient } from "@/utils/supabase/server";

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

export async function getAllWorkspaceBilling(): Promise<WorkspaceBilling[]> {
  const supabase = await createClient();

  /* 1️⃣ Get user */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  /* 2️⃣ Get all workspaces owned by user */
  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("id, name, plan")
    .eq("owner", user.id);

  if (!workspaces || workspaces.length === 0) {
    return [];
  }

  /* 3️⃣ Get all payments for those workspaces */
  const workspaceIds = workspaces.map((w) => w.id);

  const { data: payments } = await supabase
    .from("payment")
    .select(
      "id, order_id, payment_id, amount, expDate, payment_date, status, workspace_id"
    )
    .in("workspace_id", workspaceIds)
    .order("expDate", { ascending: false });

  /* 4️⃣ Build billing per workspace */
  return workspaces.map((workspace) => {
    const workspacePayments =
      payments?.filter((p) => p.workspace_id === workspace.id) ?? [];

    const latestPayment = workspacePayments[0];
    const today = new Date();

    const expDate = latestPayment ? new Date(latestPayment.expDate) : null;

    return {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      plan: expDate && today >= expDate ? "Pro" : "Free",
      plan_expires_at: expDate,
      payments: workspacePayments,
    };
  });
}
