import { dashboardData } from "@/app/functions/dashboardData";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  /* 1. Get logged-in user */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json(
      { error: "Unauthorized", data: null },
      { status: 401 }
    );
  }
  const dashboard = await dashboardData({ supabase, userId: user.id });
  return Response.json(
    { error: dashboard[0].error, data: dashboard },
    { status: dashboard[0].error ? 500 : 200 }
  );
}
