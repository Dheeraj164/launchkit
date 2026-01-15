import React from "react";

export default function UserInfoSection({
  users,
}: {
  users:
    | {
        id: string;
        email: string;
        phonenumber: string;
        firstname: string;
        lastname: string;
        role: string;
        created_at: string;
      }[]
    | undefined;
}) {
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center text-sm text-gray-500">
        <div className="mb-3 text-3xl">👥</div>
        <p>No users found</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Users</h2>

        <span className="text-sm text-gray-500">{users.length} total</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Joined</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 transition hover:bg-gray-50">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                        {user.firstname[0]}
                        {user.lastname[0]}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {user.firstname} {user.lastname}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      `}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
