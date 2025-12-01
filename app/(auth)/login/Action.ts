import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const signinWithGoogole = async () => {
  const supabase = createClient();
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
