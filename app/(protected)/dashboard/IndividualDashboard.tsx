import React from "react";
import DashboardActivity from "./DashboardActivity";
import DashboardRight from "./DashboardRight";
import DashboardStats from "./DashboardStats";
import DashBoardUsageChart from "./DashboardUsageChart";
import { DashboardDataType } from "@/app/actions/getDashboardData";

export default function IndividualDashboard({
  dashboard,
}: {
  dashboard: DashboardDataType;
}) {
  console.log(dashboard);
  return (
    <div className="border border-gray-400 rounded-2xl shadow-2xl mt-3 p-2">
      <p className="p-2 text-2xl font-bold">{dashboard.workspace?.name}</p>
      {/* STATS */}
      <DashboardStats
        teamCount={dashboard.teamCount!}
        plan={dashboard.workspace!.plan}
        usage={dashboard.usage!.total30d}
        quota={dashboard.usage!.percentage}
      />
      {/* MAIN GRID */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          <DashBoardUsageChart usage={dashboard.usage!} />

          {/* ACTIVITY */}
          <DashboardActivity />
        </div>

        {/* RIGHT */}
        <DashboardRight
          workspaceId={dashboard.workspace!.id!}
          teamNames={dashboard.teamNames!}
          plan={dashboard.workspace!.plan}
          quota={dashboard.usage!.quota}
        />
      </section>
    </div>
  );
}
