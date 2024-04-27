import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabaseAdmin = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
    await supabaseAdmin.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(url.origin);
}
