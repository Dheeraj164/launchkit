import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface dashboardRightProps {
  workspaceId: string;
  teamNames: {
    firstname: string;
    lastname: string;
  }[];
  plan: "free" | "pro";
  quota: number;
}

export default function DashboardRight({
  workspaceId,
  teamNames,
  plan,
  quota,
}: dashboardRightProps) {
  // const { dashboardData } = useContext(AppContext);

  // if (!dashboardData) {
  //   return <div className="p-10">No dashboard data</div>;
  // }
  return (
    <aside className="space-y-4">
      {/* TEAM */}
      <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
        <h3 className="text-sm font-medium">Team</h3>

        {/* <Activity mode={showInvite ? "visible" : "hidden"}>
                <Invite />
              </Activity> */}

        {teamNames.map((teamName, i) => {
          return (
            <div key={i} className="mt-3 flex items-center gap-3">
              <Icon icon="person" className="h-30 w-30" />
              {/* <Image
                src="https://avatars.dicebear.com/api/identicon/dheeraj.svg"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              /> */}
              <div>
                <p className="text-sm font-semibold">
                  {teamName.firstname} {teamName.lastname}
                </p>
                {/* <p className="text-xs text-gray-500">Owner</p> */}
              </div>
            </div>
          );
        })}

        {/* <Button
                className="mt-4 w-full"
                onClick={() => setShowInvite(true)}>
                Invite member
              </Button> */}
      </div>

      {/* BILLING */}
      <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
        <h3 className="text-sm font-medium">Billing</h3>
        <p className="mt-2 text-sm font-semibold">{plan.toUpperCase()} plan</p>
        <p className="text-xs text-gray-500">
          Monthly quota: {quota.toLocaleString()} requests
        </p>

        <Link href={`/payment/${workspaceId}`}>
          <Button className="mt-4 w-full">Manage plan</Button>
        </Link>
      </div>
    </aside>
  );
}
