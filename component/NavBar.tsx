"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { signout } from "@/app/(auth)/login/Action";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { user } = useContext(AppContext);
  // const { user } = AppCtx();

  // close when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!sidebarRef.current) return;
      if (showMenu && !sidebarRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu]);

  // close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowMenu(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-700 text-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* left: hamburger and brand */}
        <div className="flex items-center gap-3">
          <button
            aria-label={showMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={showMenu}
            onClick={() => setShowMenu((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-600/60 hover:bg-gray-600/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300">
            <Icon
              icon={showMenu ? "mdi:close" : "mdi:hamburger-menu"}
              width={20}
              height={20}
            />
          </button>

          <div className="font-medium text-lg">Your SaaS</div>
        </div>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-600/50 md:inline-flex">
            <Icon icon="mdi:bell-outline" width={18} height={18} />
            <span className="text-sm">Notifications</span>
          </button>

          <Button
            onClick={() => {
              signout();
              console.log("signout");
              router.push("/login");
            }}>
            Logout
          </Button>
        </div>
      </div>

      {/* overlay (for small screens) */}
      <div
        onClick={() => setShowMenu(false)}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity ${
          showMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!showMenu}
      />

      {/* sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-gray-800/95 p-4 text-white transition-transform duration-300 ease-in-out md:w-72 ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!showMenu}>
        <nav className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:account-circle-outline" width={28} height={28} />
              <div>
                <div className="text-sm font-semibold">
                  {user?.firstname} {user?.lastname}
                </div>
                <div className="text-xs text-gray-300">{user?.email}</div>
              </div>
            </div>
            <button
              aria-label="Close sidebar"
              onClick={() => setShowMenu(false)}
              className="rounded-md p-1 hover:bg-gray-700/40">
              <Icon icon="mdi:close" width={18} height={18} />
            </button>
          </div>

          <hr className="border-gray-700" />

          <ul className="flex flex-1 flex-col gap-1">
            <li>
              <Link
                onClick={() => setShowMenu(false)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-700/40"
                href="/dashboard">
                <Icon icon="mdi:home" width={18} height={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowMenu(false)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-700/40"
                href="/workspace">
                <Icon icon="mdi:account-group" width={18} height={18} />
                <span>Workspaces</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-700/40"
                href="/billing">
                <Icon icon="mdi:credit-card" width={18} height={18} />
                <span>Billing</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-700/40"
                href="/settings">
                <Icon icon="mdi:cog-outline" width={18} height={18} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <div className="mt-auto">
            <hr className="border-gray-700 mb-3" />
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div>Plan: Pro</div>
              <a className="underline" href="#">
                Upgrade
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </header>
  );
}
