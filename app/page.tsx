"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const supabaseClient = createClient();
      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (
          (event === "SIGNED_IN" ||
            event === "INITIAL_SESSION" ||
            event === "TOKEN_REFRESHED") &&
          session
        ) {
          router.push("/dashboard");
        }
      });
    })();
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      Hello World!
    </div>
  );
}
