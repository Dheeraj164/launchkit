import React from "react";

export default function WorkspaceSection({
  workspaces,
}: {
  workspaces:
    | {
        id: string;
        name: string;
        owner: string;
        created_at: string;
        plan: string;
        plan_endDate: string;
        ownerName: {
          firstname: string;
          lastname: string;
        };
      }[]
    | undefined;
}) {
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-500">
        No workspaces found
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Workspaces</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            {/* Header */}
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {workspace.name}
              </h3>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {workspace.plan.toUpperCase()}
              </span>
            </div>

            {/* Owner */}
            <p className="mt-2 text-sm text-gray-600">
              Owner:{" "}
              <span className="font-medium text-gray-900">
                {workspace.ownerName.firstname} {workspace.ownerName.lastname}
              </span>
            </p>

            {/* Meta */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>
                Created {new Date(workspace.created_at).toLocaleDateString()}
              </span>

              {workspace.plan_endDate && (
                <span>
                  Expires{" "}
                  {new Date(workspace.plan_endDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
