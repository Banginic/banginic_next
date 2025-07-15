import { userTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";


export async function POST(req: Request) {
  const body = await req.json();
  console.log(body)
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required", success: false },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  if (existInDB.length === 1) {
    return NextResponse.json(
      { success: false, error: "User Already Exist" },
      { status: 400 }
    );
  }
  const newPassword = await hashPassword(password);
  if (!newPassword) {
    return NextResponse.json(
      { success: false, error: "Error hashing password" },
      { status: 500 }
    );
  }
  const isAdmin = email === process.env.ADMIN_EMAIL;
 const user =  await db
    .insert(userTable)
    .values({ name, email, password: newPassword, isAdmin });
 
    console.log(user)
  const token = await generateToken({ email });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3days
    sameSite: "lax",
  });
  return NextResponse.json(
    { success: true, message: "Sign up successfully", token, data: user },
    { status: 201 }
  );
}
