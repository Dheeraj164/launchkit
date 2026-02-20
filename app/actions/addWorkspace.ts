"use server";
import { createClient } from "@/utils/supabase/server";
// import { workspaceAdd } from "../functions/workspaceAdd";

export async function addWorkspace(formData: FormData) {
  // const workspaceName = formData.get("workspaceName") as string;
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  const clientName = formData.get("clientName");
  const clientEmail = formData.get("clientEmail");
  const titles = formData.getAll("milestoneTitle");
  const rates = formData.getAll("milestoneRate");
  const dueDates = formData.getAll("milestoneDueDate");

  const milestones = titles.map((title, index) => ({
    title: String(title),
    rate: String(rates[index]),
    dueDate: String(dueDates[index]),
  }));
  const workspace = {
    userId: user?.id,
    clientName,
    clientEmail,
    milestones,
  };

  console.log("workspace: ", workspace);

  // return add({ supabase, workspaceName });
}
