interface DashboardStatsProps {
  teamCount: number;
  plan: "free" | "pro";
  usage: number;
  quota: number;
}

export default function DashboardStats({
  teamCount,
  plan,
  usage,
  quota,
}: DashboardStatsProps) {
  // const { dashboardData } = useContext(AppContext);

  // if (!dashboardData) {
  //   return <div className="p-10">No dashboard data</div>;
  // }
  const stats = [
    {
      title: "Team Members",
      value: teamCount,
      //  dashboardData.teamCount
    },
    {
      title: "Plan",
      value: plan.toUpperCase(),
      //  dashboardData.workspace.plan.toUpperCase()
    },
    {
      title: "API Calls (30 days)",
      value: usage.toLocaleString(),
      // dashboardData.usage.total30d.toLocaleString(),
    },
    {
      title: "Quota Used",
      value: `${quota}%`,
      //  `${dashboardData.usage.percentage}%`
    },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.title}
          className="rounded-lg bg-white p-4 shadow border border-gray-100">
          <p className="text-xs font-medium text-gray-500">{s.title}</p>
          <p className="mt-1 text-xl font-semibold">{s.value}</p>
        </div>
      ))}
    </section>
  );
}
