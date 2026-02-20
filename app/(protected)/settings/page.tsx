"use client";

import { Button, Input } from "@heroui/react";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function SettingsPage() {
  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-600">
            Manage your account and security preferences.
          </p>
        </div>

        {/* ACCOUNT */}
        <section className="rounded-lg bg-white p-6 shadow-gray-500 border shadow-2xl mb-6 border-gray-300">
          <h2 className="text-sm font-medium mb-4">Account</h2>

          <div className="flex items-center gap-4 mb-6">
            <Button size="sm" variant="ghost">
              Change avatar
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs text-gray-500">First name</label>
              <Input placeholder="Your name" value={user?.firstname} />
            </div>
            <div>
              <label className="text-xs text-gray-500">Last name</label>
              <Input placeholder="Your name" value={user?.lastname} />
            </div>

            <div>
              <label className="text-xs text-gray-500">Email</label>
              <Input
                placeholder="you@example.com"
                value={user?.email}
                disabled
              />
            </div>
          </div>

          <div className="mt-4">
            <Button>Save changes</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
