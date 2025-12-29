import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { pathname } = request.nextUrl;
  const user = supabase.auth.getUser();
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to proceed if authenticated or not a protected route
  return NextResponse.next();
}
