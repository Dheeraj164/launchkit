import Invite from "@/component/Invite";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceCard from "./WorkspaceCard";
import MembersList from "./MembersList";

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-4 pt-20 pb-12">
        {/* HEADER */}
        <WorkspaceHeader />

        {/* WORKSPACE CARD */}
        <WorkspaceCard />
        {/* MEMBERS LIST (STATIC FOR NOW) */}
        <MembersList />

        <Invite />
      </main>
    </div>
  );
}
