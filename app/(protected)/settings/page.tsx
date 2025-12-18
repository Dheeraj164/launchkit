"use client";

import { Button, Input } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const { user } = useContext(AppContext);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

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
        <section className="rounded-lg bg-white p-6 shadow border border-gray-100 mb-6">
          <h2 className="text-sm font-medium mb-4">Account</h2>

          <div className="flex items-center gap-4 mb-6">
            <Image
              src="https://avatars.dicebear.com/api/identicon/user.svg"
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
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

        {/* SECURITY */}
        <section className="rounded-lg bg-white p-6 shadow border border-gray-100 mb-6">
          <h2 className="text-sm font-medium mb-4">Security</h2>

          <div className="flex flex-col gap-3">
            <Button variant="ghost">Change password</Button>

            <Button variant="danger" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-sm font-medium text-red-700 mb-2">Danger zone</h2>
          <p className="text-xs text-red-600 mb-4">
            These actions are irreversible.
          </p>

          <Button>Delete account</Button>
        </section>
      </main>
    </div>
  );
}
