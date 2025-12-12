"use client";
import { AppCtx } from "@/context/AppContext";
import { User } from "@/model/User";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const supabaseClient = createClient();

  const router = useRouter();
  const { setUser } = AppCtx();
  useEffect(() => {
    (async () => {
      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (
          (event === "SIGNED_IN" ||
            event === "INITIAL_SESSION" ||
            event === "TOKEN_REFRESHED" ||
            event == "USER_UPDATED") &&
          session
        ) {
          getUser(session.user.id);

          router.push("/dashboard");
        } else if (event == "SIGNED_OUT") {
          console.log("SIGNED_OUT");
          router.push("/login");
        } else {
          router.push("/login");
        }
      });
    })();

    const getUser = async (id: string) => {
      const { data, error } = await supabaseClient
        .from("userinfo")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        console.log("getting users");
        setUser(
          new User({
            id: data["id"],
            firstname: data["firstname"],
            lastname: data["lastname"],
            email: data["email"],
            phonenumber: data["phonenumber"],
            created_at: data["created_at"],
          })
        );
      }
      if (error) console.warn(error);
    };
  }, [router, supabaseClient, setUser]);
  return <div className="flex min-h-screen items-center justify-center" />;
}
