import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

const PLAN_LIMITS: Record<string, number> = {
  free: 50_000,
  pro: 2_000_000,
};

function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // 1. Extract API key
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const rawKey = authHeader.replace("Bearer ", "");
  const keyHash = hashKey(rawKey);

  // 2. Validate API key
  const { data: apiKey } = await supabase
    .from("api_keys")
    .select("workspace_id, revoked")
    .eq("key_hash", keyHash)
    .single();

  if (!apiKey || apiKey.revoked) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const workspaceId = apiKey.workspace_id;

  // 3. Get workspace + plan
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("plan")
    .eq("id", workspaceId)
    .single();

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const quota = PLAN_LIMITS[workspace.plan];

  // 4. Calculate current month usage
  const { data: usageData } = await supabase
    .from("usage")
    .select("api_calls")
    .eq("workspace_id", workspaceId)
    .gte(
      "date",
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0]
    );

  const used = usageData?.reduce((sum, row) => sum + row.api_calls, 0) ?? 0;

  if (used >= quota) {
    return NextResponse.json(
      { error: "Quota exceeded. Please upgrade your plan." },
      { status: 429 }
    );
  }

  // 5. Increment today's usage
  const today = new Date().toISOString().split("T")[0];

  await supabase.rpc("increment_usage", {
    p_workspace_id: workspaceId,
    p_date: today,
  });

  // 6. Return success
  return NextResponse.json({
    success: true,
    message: "Request processed successfully",
  });
}
