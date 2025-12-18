"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Invite from "@/component/Invite";
import UsageChart from "@/component/UsageChart";
import Link from "next/link";
import Loading from "@/component/Loading";

interface DashboardData {
  workspace: {
    name: string;
    plan: "free" | "pro";
  };
  teamCount: number;
  usage: {
    total30d: number;
    quota: number;
    percentage: number;
    daily: { date: string; api_calls: number }[];
  };
}

export default function DashboardPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch("/api/dashboard");

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to load dashboard");
        }

        const json = await res.json();
        if (json.error) {
          setError(json.error.message);
        }

        setData(json);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-10 text-red-600">Error loading dashboard: {error}</div>
    );
  }

  if (!data) {
    return <div className="p-10">No dashboard data</div>;
  }

  const stats = [
    { title: "Team Members", value: data.teamCount },
    { title: "Plan", value: data.workspace.plan.toUpperCase() },
    {
      title: "API Calls (30 days)",
      value: data.usage.total30d.toLocaleString(),
    },
    { title: "Quota Used", value: `${data.usage.percentage}%` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-3 md:px-6 pt-20 pb-12">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-gray-600">
            Monitor API usage, quota, and team activity.
          </p>
        </div>

        {/* STATS */}
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

        {/* MAIN GRID */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            <UsageChart usage={data.usage} />

            {/* ACTIVITY */}
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
          </div>

          {/* RIGHT */}
          <aside className="space-y-4">
            {/* TEAM */}
            <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
              <h3 className="text-sm font-medium">Team</h3>

              {showInvite && <Invite setShowInvite={setShowInvite} />}

              <div className="mt-3 flex items-center gap-3">
                <Image
                  src="https://avatars.dicebear.com/api/identicon/dheeraj.svg"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">Dheeraj Kumar</p>
                  <p className="text-xs text-gray-500">Owner</p>
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                onClick={() => setShowInvite(true)}>
                Invite member
              </Button>
            </div>

            {/* BILLING */}
            <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
              <h3 className="text-sm font-medium">Billing</h3>
              <p className="mt-2 text-sm font-semibold">
                {data.workspace.plan.toUpperCase()} plan
              </p>
              <p className="text-xs text-gray-500">
                Monthly quota: {data.usage.quota.toLocaleString()} requests
              </p>

              <Link href="/payment">
                <Button className="mt-4 w-full">Manage plan</Button>
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
