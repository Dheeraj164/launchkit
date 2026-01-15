"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/model/User";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { AppContextType, WorkspaceData } from "@/utils/intefaces_types";

export const AppContext = createContext<AppContextType>({
  user: null,

  setUser: () => {},
  loading: false,
  setLoading: () => {},

  selectedWorkspace: null,
  setSelectedWorkspace: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceData | null>(null);

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
              role: data.role,
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

          router.replace("/login");
        } else {
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
  }, [supabase, router, pathname]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
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
