import { WorkspaceData } from "@/app/(protected)/workspace/page";
import { createClient } from "@/utils/supabase/client";

interface WorkspaceTileProps {
  workspace: WorkspaceData;
  //   setShowInvite: (value: boolean) => void;
}

export default function WorkspaceTile({
  workspace,
}: //   setShowInvite,
WorkspaceTileProps) {
  const supabase = createClient();

  const user = supabase.auth.getUser();

  return (
    <div className="rounded-lg bg-white p-4 shadow border border-gray-100 m-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <p className="text-sm text-gray-500">
            Plan: {workspace.plan.toUpperCase()}
          </p>
        </div>

        {/* <Button onClick={() => setShowInvite(true)}>Invite member</Button> */}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Owner</div>
          <div className="mt-2 text-md font-semibold">
            {workspace.userinfo.firstname} {workspace.userinfo.lastname}
          </div>
        </div>

        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Plan</div>
          <div className="mt-2 text-md font-semibold">
            {workspace.plan.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
