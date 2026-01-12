import Link from "next/link";
import React, { Activity } from "react";

interface BillingCurrentPlanProps {
  workspaceId: string;
  workspaceName: string;
  plan: "Free" | "Pro";
  expiry: Date | null;
}

export default function BillingCurrentPlan({
  workspaceId,
  workspaceName,
  plan,
  expiry,
}: BillingCurrentPlanProps) {
  return (
    <section className="mb-6 rounded-lg bg-white p-4 shadow border border-gray-100 flex justify-between items-center">
      <div>
        {/* <p className="text-sm text-gray-500">{workspaceId}</p> */}
        <p className="text-lg font-medium capitalize">{workspaceName}</p>
        <p className="text-sm text-gray-500">Current Plan</p>
        <p className="text-lg font-medium capitalize">{plan}</p>
        <Activity
          mode={expiry && new Date(expiry) < new Date() ? "visible" : "hidden"}>
          <p className="text-xs text-gray-500">
            Expires on {new Date(expiry!).toLocaleDateString()}
          </p>
        </Activity>
      </div>
      <Activity mode={plan === "Free" ? "visible" : "hidden"}>
        <Link
          href="/payment"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
          Upgrade to Pro
        </Link>
      </Activity>
    </section>
  );
}
