"use client";

interface UsageChartProps {
  usage: {
    total30d: number;
    quota: number;
    percentage: number;
    daily: { date: string; api_calls: number }[];
  };
}

export default function UsageChart({ usage }: UsageChartProps) {
  const { total30d, quota, percentage, daily } = usage;

  const values = daily.map((d) => d.api_calls);

  const points = (() => {
    if (values.length === 0) return "";

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    return values
      .map((value, i) => {
        const x = (i / (values.length - 1)) * 100;
        const y = 30 - ((value - minVal) / Math.max(maxVal - minVal, 1)) * 25;
        return `${x},${y}`;
      })
      .join(" ");
  })();

  return (
    <div className="rounded-lg bg-white p-4 shadow border border-gray-100 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium">Usage (last 30 days)</h2>
          <p className="text-xs text-gray-500">API calls and quota usage</p>
        </div>
        <div className="text-xs text-gray-500">
          Total: {total30d.toLocaleString()}
        </div>
      </div>

      {values.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-gray-400">
          No usage yet
        </div>
      ) : (
        <div className="mt-4 h-40">
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="h-full w-full">
            <polyline
              fill="none"
              points={points}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <p>Quota: {quota.toLocaleString()}</p>
        <p>
          Used: {total30d.toLocaleString()} ({percentage}%)
        </p>
      </div>
    </div>
  );
}
