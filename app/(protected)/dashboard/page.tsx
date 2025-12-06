"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function DashboardPage() {
  // demo data
  const stats = [
    { title: "Active Users", value: "1,248", delta: "+4.2%" },
    { title: "Monthly Recurring Revenue", value: "$12,420", delta: "+2.8%" },
    { title: "Projects", value: "34", delta: "-1.1%" },
    { title: "API Calls (30d)", value: "1.2M", delta: "+8.7%" },
  ];

  const recentActivity = [
    { id: 1, text: "Invoice #233 paid by Acme Corp.", time: "2h ago" },
    { id: 2, text: "New user signup: jane@doe.com", time: "5h ago" },
    { id: 3, text: "Workspace 'Acme' created", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-4 pt-20 pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Overview</h1>
            <p className="text-sm text-gray-600">
              Quick summary of your workspace and usage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => alert("Create new project")}>
              New Project
            </Button>
            <Button onClick={() => alert("Invite team")}>Invite</Button>
          </div>
        </div>

        {/* Stat cards */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.title} className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-500">
                    {s.title}
                  </div>
                  <div className="mt-1 text-xl font-semibold">{s.value}</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50">
                  <Icon icon="mdi:chart-line" width={20} height={20} />
                </div>
              </div>
              <div className="mt-3 text-sm text-green-600">{s.delta}</div>
            </div>
          ))}
        </section>

        {/* Main area */}
        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left: Charts & usage */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium">Usage (last 30 days)</h2>
                  <p className="text-xs text-gray-500">
                    API calls, requests and quota usage.
                  </p>
                </div>
                <div className="text-xs text-gray-500">Total: 1.2M</div>
              </div>

              {/* simple sparkline placeholder */}
              <div className="mt-4 h-44">
                <svg
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                  className="h-full w-full">
                  <polyline
                    fill="none"
                    points="0,20 10,18 20,12 30,8 40,6 50,10 60,9 70,4 80,6 90,3 100,2"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>Quota: 2M requests</div>
                <div>Used: 1.2M (60%)</div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Recent Activity</h2>
                <a className="text-sm text-indigo-600" href="#">
                  See all
                </a>
              </div>

              <ul className="mt-3 space-y-3">
                {recentActivity.map((r) => (
                  <li key={r.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-gray-100 p-2">
                        <Icon icon="mdi:history" width={18} height={18} />
                      </div>
                      <div>
                        <div className="text-sm">{r.text}</div>
                        <div className="text-xs text-gray-500">{r.time}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">View</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Team, Billing & Quick Actions */}
          <aside className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Team</h3>
                <a className="text-sm text-indigo-600" href="#">
                  Manage
                </a>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Image
                  className="h-10 w-10 rounded-full"
                  src="https://avatars.dicebear.com/api/identicon/dheeraj.svg"
                  alt="avatar"
                  width={500}
                  height={500}
                />
                <div>
                  <div className="text-sm font-semibold">Dheeraj Kumar</div>
                  <div className="text-xs text-gray-500">Owner</div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button onClick={() => alert("Invite")}>Invite member</Button>
                {/* <Button onClick={() => alert("View members")}>
                  View members
                </Button> */}
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Billing</h3>
                <a className="text-sm text-indigo-600" href="#">
                  Manage
                </a>
              </div>

              <div className="mt-3">
                <div className="text-sm font-semibold">Pro</div>
                <div className="text-xs text-gray-500">Renews: Mar 1, 2026</div>
                <div className="mt-3 flex items-center gap-2">
                  <Button onClick={() => alert("Upgrade")}>Upgrade</Button>
                  <a className="ml-auto text-sm text-indigo-600" href="#">
                    Invoices
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-sm font-medium">Quick Actions</h3>
              <div className="mt-3 flex flex-col gap-2">
                <button className="rounded-md border px-3 py-2 text-left text-sm hover:bg-gray-50">
                  Create API key
                </button>
                <button className="rounded-md border px-3 py-2 text-left text-sm hover:bg-gray-50">
                  Export CSV
                </button>
                <button className="rounded-md border px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                  Deactivate workspace
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer small stats table */}
        <section className="mt-6 rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Top Projects</h3>
            <a className="text-sm text-indigo-600" href="#">
              View all
            </a>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full table-auto text-left text-sm">
              <thead className="text-xs text-gray-500">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Usage</th>
                  <th className="py-2">Members</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2">Acme API</td>
                  <td className="py-2">Active</td>
                  <td className="py-2">420k</td>
                  <td className="py-2">4</td>
                </tr>
                <tr>
                  <td className="py-2">Billing Service</td>
                  <td className="py-2">Maintenance</td>
                  <td className="py-2">12k</td>
                  <td className="py-2">2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

// Note: This file expects the NavBar component to be in the same folder as "NavBar.tsx" (the file we previously added to canvas).
// You can split components into separate files, add real charts (Recharts, Chart.js), and wire data from your backend as needed.
