"use client";

import { Workspace } from "@/app/model/Workspace";
import { useRouter } from "next/navigation";

export default function WorkspaceTile({ workspace }: { workspace: Workspace }) {
  const router = useRouter();

  const milestoneCount = workspace.milestones?.length ?? 0;

  const totalValue =
    workspace.milestones?.reduce(
      (acc: number, m) => acc + Number(m.rate || 0),
      0,
    ) ?? 0;

  return (
    <div
      onClick={() => router.push(`/workspace/${workspace.id}`)}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
            {workspace.clientName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{workspace.clientEmail}</p>
        </div>

        <div className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
          {milestoneCount} Milestones
        </div>
      </div>

      {/* Deliverables Preview */}
      <p className="mt-4 text-sm text-gray-600 line-clamp-2">
        {workspace.deliverables}
      </p>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-xs text-gray-400">Total Value</p>
          <p className="text-lg font-semibold text-gray-900">
            ₹{totalValue.toLocaleString()}
          </p>
        </div>

        <div className="text-xs text-gray-400">
          {new Date(workspace.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
