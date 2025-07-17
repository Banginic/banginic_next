import { messageTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";



export async function POST(req: Request) {
  const body = await req.json();
  console.log(body)
  const { name, email, message, service, phone } = body;
  if (!name || !email || !message || !phone || !service) {
   
    return NextResponse.json(
      { message: "All fields are required", success: false },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(messageTable)
    .where(and
        (eq(messageTable.email, email), eq(messageTable.phone, phone))
    )
    .limit(3);

  if (existInDB.length > 2) {
    return NextResponse.json(
      { success: false, message: "You've exceeded total messages." },
      { status: 401 }
    );
  }

 await db
    .insert(messageTable)
    .values({ name, email, phone, service, message });


  return NextResponse.json(
    { success: true, message: "Message sent successfully",  data: [] },
    { status: 201 }
  );
}
