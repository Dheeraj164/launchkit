import DashboardActivity from "./DashboardActivity";
import DashboardHeader from "./DashboardHeader";
import DashboardRight from "./DashboardRight";
import DashboardStats from "./DashboardStats";
import DashBoardUsageChart from "./DashboardUsageChart";

export default function DashboardPage() {
  // const [showInvite, setShowInvite] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-3 md:px-6 pt-20 pb-12">
        <DashboardHeader />

        {/* STATS */}
        <DashboardStats />
        {/* MAIN GRID */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            <DashBoardUsageChart />

            {/* ACTIVITY */}
            <DashboardActivity />
          </div>

          {/* RIGHT */}
          <DashboardRight />
        </section>
      </main>
    </div>
  );
}
