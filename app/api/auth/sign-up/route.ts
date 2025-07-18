import { userTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { hashPassword } from "@/lib/bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";


export async function POST(req: Request) {
  const body = await req.json();
  console.log(body)
  const { name, email, password, phone } = body;
  if (!name || !email || !password || !phone) {
   
    return NextResponse.json(
      { message: "All fields are required", success: false },
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
      { success: false, message: "User Already Exist" },
      { status: 400 }
    );
  }
  const newPassword = await hashPassword(password);
  if (!newPassword) {
    return NextResponse.json(
      { success: false, message: "Error hashing password" },
      { status: 500 }
    );
  }
  const isAdmin = email === process.env.ADMIN_EMAIL;
 await db
    .insert(userTable)
    .values({ name, email, phone, password: newPassword, isAdmin });

  const user = await db.select()
  .from(userTable)
  .where(and
    ( eq(userTable.email, email), eq(userTable.name, name))
  )
  .limit(1)
 
  const token = await generateToken({ email });

  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3days
    sameSite: "lax",
  });
  return NextResponse.json(
    { success: true, message: "Sign up successfully", token, data: user[0] },
    { status: 201 }
  );
}
