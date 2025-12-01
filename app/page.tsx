"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async () => {
      const supabaseClient = createClient();
      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
        }
      });
    })();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center">
      Hello World!
    </div>
  );
}
