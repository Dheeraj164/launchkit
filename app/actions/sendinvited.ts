"use server";

import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";
import { invite } from "../functions/invite";

export async function sendInvite({
  invitedWorkspace,
  invitedWorkspaceId,
}: {
  invitedWorkspace: string;
  invitedWorkspaceId: string;
}) {
  const supabase = await createClient();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const inviteLink = new URL(
    `${process.env.NEXT_PUBLIC_SITE_URL}/invitelink/${invitedWorkspaceId}`
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const senderEmail = user?.email;
  if (senderEmail)
    return invite({ resend, senderEmail, invitedWorkspace, inviteLink });
}
