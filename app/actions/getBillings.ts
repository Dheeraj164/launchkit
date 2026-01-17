"use server";

import { createClient } from "@/utils/supabase/server";
import { workspaceBillings } from "../functions/workspaceBIllings";

export type WorkspaceBilling = {
  workspaceId: string;
  workspaceName: string;
  plan: "Pro" | "Free";
  plan_expires_at: Date | null;
  payments: {
    id: string;
    order_id: string;
    payment_id: string;
    amount: string;
    expDate: string;
    payment_date: string;
    status: string;
  }[];
};

export async function getAllWorkspaceBilling() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized", data: null };
  }
  return await workspaceBillings({ supabase, userId: user.id });
}
