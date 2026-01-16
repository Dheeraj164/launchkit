// export const revalidate = 60;

import { getDashboardData } from "@/app/actions/getDashboardData";
import DashboardHeader from "./DashboardHeader";
import IndividualDashboard from "./IndividualDashboard";
import Empty from "@/component/Empty";

export default async function page() {
  const dashboardData = await getDashboardData();
  // console.log(dashboardData);
  if (dashboardData[0].error === "workspace not found") {
    return (
      <Empty
        header={dashboardData[0].error}
        message="You haven't created a workspace yet. Workspaces help you manage
          projects, teammates, and usage in one place."
        button={true}
      />
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
