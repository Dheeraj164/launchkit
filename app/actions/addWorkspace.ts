"use server";
import { createClient } from "@/utils/supabase/server";
import { workspaceAdd } from "../functions/workspaceAdd";
// import { workspaceAdd } from "../functions/workspaceAdd";

export async function addWorkspace(formData: FormData) {
  // const workspaceName = formData.get("workspaceName") as string;
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { error: "", data: null };

  const clientName = formData.get("clientName");
  const name = formData.get("name");
  const clientEmail = formData.get("clientEmail");
  const deliverables = formData.get("deliverables");
  const titles = formData.getAll("milestoneTitle");
  const rates = formData.getAll("milestoneRate");
  const dueDates = formData.getAll("milestoneDueDate");

  const milestones = titles.map((title, index) => ({
    title: String(title),
    rate: String(rates[index]),
    dueDate: String(dueDates[index]),
  }));
  const workspace = {
    owner: user!.id,
    name,
    clientName,
    clientEmail,
    deliverables,
    milestones,
  };

  return workspaceAdd({ supabase, workspace });
}
