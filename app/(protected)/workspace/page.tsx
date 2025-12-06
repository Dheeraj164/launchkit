"use client";

import React, { Activity, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import Image from "next/image";
import AddWorkspace from "@/component/AddWorkspace";

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState([
    {
      id: "w-1",
      name: "Acme Corp",
      role: "Owner",
      members: 4,
      createdAt: "2024-08-01",
    },
    {
      id: "w-2",
      name: "Beta Team",
      role: "Admin",
      members: 6,
      createdAt: "2024-10-12",
    },
  ]);
  const [selected, setSelected] = useState(workspaces[0].id);
  const [showInvite, setShowInvite] = useState(false);
  const [showAddWorkSpace, setShowAddWorkSpace] = useState(false);
  const [query, setQuery] = useState("");

  function createWorkspace(name: string) {
    const id = `w-${Math.random().toString(36).slice(2, 8)}`;
    const newWs = {
      id,
      name: `${name}`,
      role: "Owner",
      members: 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setWorkspaces((s) => [newWs, ...s]);
    setSelected(id);
  }

  function leaveWorkspace(id: string) {
    if (!confirm("Are you sure you want to leave this workspace?")) return;
    setWorkspaces((s) => s.filter((w) => w.id !== id));
    if (selected === id && workspaces.length > 1) setSelected(workspaces[0].id);
  }

  const filtered = workspaces.filter((w) =>
    w.name.toLowerCase().includes(query.toLowerCase())
  );
  const current =
    workspaces.find((w) => w.id === selected) ?? filtered[0] ?? workspaces[0];

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Simple top bar (self-contained so this file works standalone) */}

        <main className="mx-auto max-w-screen-2xl px-4 pt-20 pb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Workspaces</h1>
              <p className="text-sm text-gray-600">
                Manage your teams, invites and roles.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setShowAddWorkSpace(true)}>
                New Workspace
              </Button>
              <Button onClick={() => setShowInvite(true)}>Invite Member</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* left: workspace list */}
            <aside className="col-span-1 rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Your Workspaces</h3>
                <div className="flex items-center gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="rounded border px-2 py-1 text-sm"
                  />
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {filtered.length === 0 && (
                  <li className="text-sm text-gray-500">No workspaces found</li>
                )}

                {filtered.map((w) => (
                  <li key={w.id}>
                    <button
                      onClick={() => setSelected(w.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left hover:bg-gray-50 ${
                        selected === w.id ? "bg-indigo-50" : ""
                      }`}>
                      <div>
                        <div className="text-sm font-medium">{w.name}</div>
                        <div className="text-xs text-gray-500">
                          {w.members} members • {w.role}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{w.createdAt}</div>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => {
                    navigator
                      .share?.({
                        title: current.name,
                        text: `Join ${current.name}`,
                        url: window.location.href,
                      })
                      .catch(() => alert("Share not supported"));
                  }}>
                  Share
                </Button>
                <a className="ml-auto text-sm text-indigo-600" href="#">
                  Manage
                </a>
              </div>
            </aside>

            {/* right: workspace details */}
            <section className="col-span-3 space-y-4">
              <div className="rounded-lg bg-white p-4 shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{current?.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Role: {current?.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => alert("Open settings")}>
                      Settings
                    </Button>
                    <button
                      onClick={() => leaveWorkspace(current!.id)}
                      className="rounded-md border px-3 py-2 text-sm text-red-600">
                      Leave
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Members</div>
                    <div className="mt-2 text-lg font-semibold">
                      {current?.members}
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Projects</div>
                    <div className="mt-2 text-lg font-semibold">12</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">API Keys</div>
                    <div className="mt-2 text-lg font-semibold">3</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Members</h3>
                  <a
                    className="text-sm text-indigo-600"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowInvite(true);
                    }}>
                    Invite
                  </a>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {/* sample members */}
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://avatars.dicebear.com/api/initials/jane.svg"
                      alt="jane"
                      height={10}
                      width={10}
                    />
                    <div>
                      <div className="text-sm font-medium">Jane Doe</div>
                      <div className="text-xs text-gray-500">
                        Admin • jane@doe.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://avatars.dicebear.com/api/initials/bob.svg"
                      alt="bob"
                      height={10}
                      width={10}
                    />
                    <div>
                      <div className="text-sm font-medium">Bob Smith</div>
                      <div className="text-xs text-gray-500">
                        Member • bob@company.com
                      </div>
                    </div>
                  </div>

                  {/* invite card */}
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                      <Icon icon="mdi:account-plus" width={18} height={18} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Invite a member</div>
                      <div className="text-xs text-gray-500">
                        Send an invite by email
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Invite modal (very simple placeholder) */}
          <Activity mode={showInvite ? "visible" : "hidden"}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-full max-w-md rounded bg-white p-6">
                <h3 className="text-lg font-semibold">Invite member</h3>
                <p className="text-sm text-gray-500">
                  Send an invite to join this workspace.
                </p>
                <div className="mt-4 flex gap-2">
                  <input
                    className="flex-1 rounded border px-3 py-2"
                    placeholder="email@company.com"
                  />
                  <Button onClick={() => alert("Invite sent")}>Send</Button>
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => setShowInvite(false)}
                    className="text-sm text-gray-500">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Activity>
        </main>
      </div>
      <Activity mode={showAddWorkSpace ? "visible" : "hidden"}>
        <AddWorkspace
          createWorkspace={createWorkspace}
          setShowAddWorkSpace={setShowAddWorkSpace}
        />
      </Activity>
    </>
  );
}

// Notes:
// - This file includes two pages: default export `DashboardPage` and named export `WorkspacePage`.
// - Move `WorkspacePage` to its own file if you prefer `export default` per route file conventions.
// - Replace alerts and placeholders with real API calls to your backend (Supabase/Flask) and wire invites, creation, and deletion.
