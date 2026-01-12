"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/model/User";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import {
  AppContextType,
  DashboardDataType,
  Payment,
  WorkspaceData,
} from "@/utils/intefaces_types";

export const AppContext = createContext<AppContextType>({
  user: null,
  payments: [],
  setPayments: () => {},
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  dashboardData: null,
  // setDashboardData: () => {},
  workspace: null,
  setWorkspace: () => {},
  selectedWorkspace: null,
  setSelectedWorkspace: () => {},
  showInvite: false,
  setShowInvite: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null
  );
  const [payments, setPayments] = useState<Payment[]>([]);
  const [workspace, setWorkspace] = useState<WorkspaceData[] | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceData | null>(null);
  const [showInvite, setShowInvite] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // <-- correct way to get current path
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    const getUser = async (id: string) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("userinfo")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.warn("getUser error:", error);
          return;
        }

        if (data && mounted) {
          setUser(
            new User({
              id: data.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phonenumber: data.phonenumber,
              created_at: data.created_at,
            })
          );
        }
      } catch (err) {
        console.error("getUser exception:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          (event === "SIGNED_IN" ||
            event === "INITIAL_SESSION" ||
            event === "TOKEN_REFRESHED" ||
            event === "USER_UPDATED") &&
          session
        ) {
          getUser(session.user.id).catch(console.warn);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          // if (pathname !== "/login")
          router.replace("/login");
        } else {
          // if (pathname !== "/login")
          router.replace("/login");
        }
      }
    );

    return () => {
      mounted = false;
      try {
        // defensive unsubscribe handling for different supabase versions
        const sub = subscription?.subscription ?? subscription;
        if (sub?.unsubscribe) sub.unsubscribe();
      } catch (e) {
        console.warn("Failed to unsubscribe from supabase auth listener:", e);
      }
    };
  }, [supabase, router, pathname]); // include pathname in deps so checks are up-to-date

  // this useeffect is to load dashboard data from the backend and store it in the context
  // useEffect(() => {
  //   async function loadDashboard() {
  //     if (!user || dashboardData) return;

  //     const res = await fetch("/api/dashboard");
  //     const json = await res.json();
  //     console.log(json);
  //     setDashboardData(json);
  //   }

  //   loadDashboard();
  // }, [user, setDashboardData, dashboardData]);

  return (
    <AppContext.Provider
      value={{
        user,
        showInvite,
        payments,
        setPayments,
        setShowInvite,
        setUser,
        loading,
        setLoading,
        dashboardData,
        workspace,
        setWorkspace,
        selectedWorkspace,
        setSelectedWorkspace,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function AppCtx() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppCtx must be used within an AppContextProvider");
  }
  return ctx;
}
