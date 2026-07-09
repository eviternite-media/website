import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "eviternite_admin_session";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host");

  if (host === "www.eviternite.shop") {
    url.host = "eviternite.shop";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  if (host === "eviternite.shop" && request.nextUrl.protocol === "http:") {
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const hasSessionCookie = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!hasSessionCookie) {
      url.pathname = "/admin/login";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|brand).*)"]
};
