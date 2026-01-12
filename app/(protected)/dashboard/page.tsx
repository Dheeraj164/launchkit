import { getDashboardData } from "@/app/actions/getDashboardData";
import DashboardActivity from "./DashboardActivity";
import DashboardHeader from "./DashboardHeader";
import DashboardRight from "./DashboardRight";
import DashboardStats from "./DashboardStats";
import DashBoardUsageChart from "./DashboardUsageChart";

export default async function page() {
  const dashboardData = await getDashboardData();

  if (!dashboardData) {
    return (
      <div className="min-h-screen justify-center items-center">
        No Dashboard Data to display
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-3 md:px-6 pt-20 pb-12">
        <DashboardHeader />

        {/* STATS */}
        <DashboardStats
          teamCount={dashboardData.teamCount}
          plan={dashboardData.workspace.plan}
          usage={dashboardData.usage.total30d}
          quota={dashboardData.usage.percentage}
        />
        {/* MAIN GRID */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            <DashBoardUsageChart usage={dashboardData.usage} />

            {/* ACTIVITY */}
            <DashboardActivity />
          </div>

          {/* RIGHT */}
          <DashboardRight
            teamNames={dashboardData.teamNames}
            plan={dashboardData.workspace.plan}
            quota={dashboardData.usage.quota}
          />
        </section>
      </main>
    </div>
  );
}
