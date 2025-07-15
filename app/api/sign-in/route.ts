import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { userTable } from "@/drizzle/schema";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "All fields are required." },
      { status: 400 }
    );
  }
   

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

    if (user.length === 0) {
      console.log('nothing')
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        // { status: 400 }
      );
    }
  const isValidPassword = comparePassword(password, user[0].password);

  if (!isValidPassword) {
    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  }
  const token = await generateToken({ email, isAdmin: user[0].isAdmin });

  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  return NextResponse.json(
    { success: true, message: "Log in successfully", data: user },
    { status: 200 }
  );
}
