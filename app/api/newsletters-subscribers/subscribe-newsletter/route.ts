import { newsletterSubscribersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";



export async function POST(req: Request) {

  const body = await req.json();

  const { email} = body;
  if (!email ) {
    return NextResponse.json(
      { message: "All fields are required", success: false },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.email, email))
    .limit(1);

  if (existInDB.length === 1) {
    return NextResponse.json(
      { success: false, message: "Already Subscribed" },
      { status: 200 }
    );
  }

 await db
    .insert(newsletterSubscribersTable)
    .values({ email });


  return NextResponse.json(
    { success: true, message: "Subscribed successfully",  },
    { status: 201 }
  );
}
