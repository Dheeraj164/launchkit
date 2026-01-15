"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export async function login(formdata: FormData) {
  const supabase = await createClient();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(error);
  }
  const { data: userRole } = await supabase
    .from("userinfo")
    .select("role")
    .eq("id", data.user?.id)
    .single();
  if (userRole?.role === "admin") redirect("/admin");
  redirect("/dashboard");
}

// const supabase = createClient();
export const signinWithGoogole = async () => {
  const supabase = await createClient();

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

// interface signinParam {
//   router: AppRouterInstance;
//   email: string;
//   password: string;
// }

// export const signin = async ({ email, password, router }: signinParam) => {
//   try {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) {
//       alert(error);
//     } else {
//       router.replace("/dashboard");
//     }
//   } catch (e) {
//     alert(e);
//   }
// };

export const signout = async () => {
  const supabase = await createClient();

  console.log("calling");
  supabase.auth.signOut();
};
