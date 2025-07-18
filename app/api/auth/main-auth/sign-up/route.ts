import { mainUserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { hashPassword } from "@/lib/bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";


export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password, phone } = body;
  if (!name || !email || !password || !phone) {
   
    return NextResponse.json(
      { message: "All fields are required", success: false },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(mainUserTable)
    .where(eq(mainUserTable.email, email))
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

 await db
    .insert(mainUserTable)
    .values({ name, email, phone, password: newPassword });

  const user = await db.select()
  .from(mainUserTable)
  .where(and
    ( eq(mainUserTable.email, email), eq(mainUserTable.name, name))
  )
  .limit(1)
 
  const token = await generateToken({ email });

  const cookieStore = await cookies();
  cookieStore.set("main-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 3days
    sameSite: "lax",
  });
  return NextResponse.json(
    { success: true, message: "Sign up successfully", token, data: user[0] },
    { status: 201 }
  );
}
