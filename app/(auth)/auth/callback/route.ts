/* eslint-disable @typescript-eslint/no-explicit-any */
// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // OAuth code flow
  const code = searchParams.get("code");

  // token_hash flow (email confirmation)
  const tokenHash = searchParams.get("token_hash") ?? searchParams.get("token");

  // IMPORTANT: treat empty string as missing
  let rawType = searchParams.get("type");
  if (rawType !== null) rawType = rawType.trim();
  const type = rawType && rawType.length > 0 ? rawType : "signup"; // fallback to "signup" (or "email")

  // redirect target (prefer next, then redirect_to)
  let next =
    searchParams.get("next") ?? searchParams.get("redirect_to") ?? "/info";
  if (!next.startsWith("/")) next = "/info";

  // compute base origin (respect forwarded host)
  const origin = url.origin;
  const forwardedHost = (request as NextRequest).headers.get(
    "x-forwarded-host"
  );
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseOrigin = isLocalEnv
    ? origin
    : forwardedHost
    ? `https://${forwardedHost}`
    : origin;

  const successRedirect = `${baseOrigin}${next}`;
  const errorRedirect = `${baseOrigin}/auth-code-error`;

  try {
    // debug logs (remove in production)
    console.log("auth/callback called with:", {
      code,
      tokenHash: tokenHash ? "[present]" : "[none]",
      type,
      next,
    });

    // 1) OAuth code
    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("OAuth exchangeCodeForSession error:", error);
        return NextResponse.redirect(errorRedirect);
      }
      return NextResponse.redirect(successRedirect);
    }

    // 2) token_hash verification server-side (creates cookies via your SSR client)
    if (tokenHash) {
      const supabase = await createClient();

      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as any,
      });

      if (error) {
        console.error("verifyOtp server error:", error);
        return NextResponse.redirect(errorRedirect);
      }
      return NextResponse.redirect(successRedirect);
    }

    // no relevant params
    return NextResponse.redirect(errorRedirect);
  } catch (err) {
    console.error("auth/callback unexpected error:", err);
    return NextResponse.redirect(errorRedirect);
  }
}
