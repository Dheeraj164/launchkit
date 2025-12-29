import { createClient } from "@/utils/supabase/client";

export const addworkspace = async ({
  name,
  owner,
}: {
  name: string;
  owner: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .insert({ name, owner })
    .select()
    .single();

  if (error) throw error;

  return data;
};
