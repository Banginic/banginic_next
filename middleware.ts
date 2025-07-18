import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value || "none";
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  const protectedRoutes = [
    "/admin",
    "/admin/employees",
    "/admin/jobs",
    "/admin/news",
    "/admin/newsletters",
    "/admin/projects",
    "/admin/testimonials",
    "/admin/message",
  ].includes(req.nextUrl.pathname);

  if (protectedRoutes && token === "none") {
   
    const signInUrl = new URL("/admin/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  const decoded = await verifyToken(token);

  if (protectedRoutes && !decoded) {
    const signInUrl = new URL("/admin/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  if (!decoded &&  protectedRoutes) {
    const signInUrl = new URL("/admin/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  if (!decoded?.isAdmin &&  protectedRoutes) {
    const signInUrl = new URL("/admin/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}
  export const config = {
  matcher: ['/admin/:path*'], // apply middleware only to admin routes
  }


export default middleware;
