import { NextResponse } from "next/server";

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // ⛔ IZINKAN LOGIN PAGE /admin TANPA CEK TOKEN
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // ⛔ IZINKAN STATIC FILE /public AGAR TIDAK IKUT DI PROXY
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // Jika tidak ada token → redirect ke /admin (login)
  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  try {
    const res = await fetch("http://localhost:4000/api/check-auth", {
      method: "GET",
      headers: { Cookie: `token=${token}` },
    });

    const data = await res.json();

    if (!data.valid) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } catch (err) {
    console.error("AUTH API ERROR:", err);
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // tetap pakai ini
  ],
};
