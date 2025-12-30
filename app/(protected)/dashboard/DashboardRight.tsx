"use client";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function DashboardRight() {
  const { dashboardData } = useContext(AppContext);

  if (!dashboardData) {
    return <div className="p-10">No dashboard data</div>;
  }
  return (
    <aside className="space-y-4">
      {/* TEAM */}
      <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
        <h3 className="text-sm font-medium">Team</h3>

        {/* <Activity mode={showInvite ? "visible" : "hidden"}>
                <Invite />
              </Activity> */}

        {dashboardData.teamNames.map((teamName, i) => {
          return (
            <div key={i} className="mt-3 flex items-center gap-3">
              <Image
                src="https://avatars.dicebear.com/api/identicon/dheeraj.svg"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">
                  {teamName.userinfo.firstname} {teamName.userinfo.lastname}
                </p>
                {/* <p className="text-xs text-gray-500">Owner</p> */}
              </div>
            </div>
          );
        })}

        {/* <Button
                className="mt-4 w-full"
                onClick={() => setShowInvite(true)}>
                Invite member
              </Button> */}
      </div>

      {/* BILLING */}
      <div className="rounded-lg bg-white p-4 shadow border border-gray-100">
        <h3 className="text-sm font-medium">Billing</h3>
        <p className="mt-2 text-sm font-semibold">
          {dashboardData.workspace.plan.toUpperCase()} plan
        </p>
        <p className="text-xs text-gray-500">
          Monthly quota: {dashboardData.usage.quota.toLocaleString()} requests
        </p>

        <Link href="/payment">
          <Button className="mt-4 w-full">Manage plan</Button>
        </Link>
      </div>
    </aside>
  );
}
