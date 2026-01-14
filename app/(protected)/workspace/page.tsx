import Invite from "@/component/Invite";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceCard from "./WorkspaceCard";
import MembersList from "./MembersList";
import { getWorkspace } from "@/app/actions/getWorkspace";

export default async function WorkspacePage() {
  const { error, data } = await getWorkspace();
  if (error || !data)
    return (
      <div className="flex justify-center min-h-screen min-w-screen items-center text-6xl bg-black text-white typewriter text-center">
        {error}
      </div>
    );

  // console.log(data);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-4 pt-20 pb-12">
        {/* HEADER */}
        <WorkspaceHeader />

        {/* WORKSPACE CARD */}
        <WorkspaceCard workspace={data.workspaces} />
        {/* MEMBERS LIST (STATIC FOR NOW) */}
        <MembersList initmember={data.workspaces[0]} />

        <Invite />
      </main>
    </div>
  );
}
