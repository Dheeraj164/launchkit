import { workspaceBillings } from "@/app/functions/workspaceBIllings";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 }
    );
  } else {
    const { data, error } = await workspaceBillings({
      supabase,
      userId: user.id,
    });

    return Response.json(
      { error: error, data: data },
      { status: error ? 500 : 200 }
    );
  }
}
