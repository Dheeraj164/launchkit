import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const signinWithGoogole = async () => {
  const supabase = createClient();
  const callbackURL = `${process.env.SITE_URL}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackURL,
    },
  });
  if (error) alert(error);

  if (data && data.url) {
    console.log(data);
    redirect(data.url);
  }
};
