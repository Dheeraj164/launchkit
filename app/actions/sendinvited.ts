"use server";

import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";

export async function sendInvite({
  receviersEmail,
  invitedWorkspace,
  invitedWorkspaceId,
}: {
  receviersEmail: string;
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

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "dheerajr.2536@gmail.com",
    subject: `You're invited to join ${invitedWorkspace}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>You’ve been invited to join <strong>${invitedWorkspace}</strong></h2>

        <p>
          <strong>${senderEmail}</strong> has invited you to collaborate in the
          <strong>${invitedWorkspace}</strong> workspace.
        </p>

        <p>
          <a
            href="${inviteLink}"
            style="
              display: inline-block;
              padding: 10px 16px;
              background-color: #4f46e5;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
            "
          >
            Accept Invitation
          </a>
        </p>

        <p>
          If you don’t have an account, you’ll be asked to create one before
          joining the workspace.
        </p>

        <p style="color: #6b7280; font-size: 12px">
          If you weren’t expecting this invite, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Invite email error:", error);
  }

  return data;
}
