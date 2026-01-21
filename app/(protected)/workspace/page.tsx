import Invite from "@/component/Invite";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceCard from "./WorkspaceCard";
import MembersList from "./MembersList";
import { getWorkspace } from "@/app/actions/getWorkspace";
import Empty from "@/component/Empty";

export default async function WorkspacePage() {
  const { error, data } = await getWorkspace();
  if (error || !data) {
    console.log(error);
    return (
      <Empty
        header={error}
        message="You haven't created a workspace yet. Workspaces help you manage
      projects, teammates, and usage in one place."
        button={true}
      />
    );
  }

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
