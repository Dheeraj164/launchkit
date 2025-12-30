import { Icon } from "@iconify/react";

export default function DashboardActivity() {
  return (
    <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
      <h2 className="text-sm font-medium">Recent Activity</h2>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <Icon icon="mdi:history" />
          API key created
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="mdi:history" />
          Member invited
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="mdi:history" />
          Upgraded to Pro plan
        </li>
      </ul>
    </div>
  );
}
