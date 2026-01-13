export const revalidate = 60;

import { getDashboardData } from "@/app/actions/getDashboardData";
import DashboardHeader from "./DashboardHeader";
import IndividualDashboard from "./IndividualDashboard";

export default async function page() {
  const dashboardData = await getDashboardData();
  // console.log(dashboardData);
  if (dashboardData[0].error === "worskpace not found") {
    return (
      <div className="flex justify-center min-h-screen min-w-screen items-center text-6xl bg-black text-white typewriter text-center">
        {dashboardData[0].error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-3 md:px-6 pt-20 pb-12">
        <DashboardHeader />
        {dashboardData.map((dashboard, i) => {
          return <IndividualDashboard dashboard={dashboard} key={i} />;
        })}
      </main>
    </div>
  );
}
