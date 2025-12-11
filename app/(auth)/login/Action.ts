import { createClient } from "@/utils/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/navigation";

const supabase = createClient();
export const signinWithGoogole = async () => {
  const callbackURL = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  console.log(callbackURL);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackURL,
    },
  });
  if (error) alert(error);

  if (data && data.url) {
    console.log(data.url);

    redirect(data.url);
  }
};

interface signinParam {
  router: AppRouterInstance;
  email: string;
  password: string;
}

export const signin = async ({ email, password, router }: signinParam) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error);
    } else {
      router.replace("/dashboard");
    }
  } catch (e) {
    alert(e);
  }
};

export const signout = async () => {
  console.log("calling");
  supabase.auth.signOut();
};
