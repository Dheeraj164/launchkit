// app/invite/page.tsx
import { createClient } from "@/utils/supabase/server";
import InviteCard from "./InviteCard";

interface InvitePageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { workspaceId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: invite } = await supabase
    .from("workspace_members")
    .update({ InvitationStatus: "Accepted" })
    .eq("user_id", user?.id)
    .is("workspace_id", workspaceId)
    .single();

  return <InviteCard />;
}
