import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { testimonialTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const messageId = searchParams.get("messageId");

  if(!messageId){
    return NextResponse.json({ success: false, message: 'Please provide Testimony ID', data: []}, { status: 400})
  }
  const testimony = await db.select()
  .from(testimonialTable)
  .where(eq(testimonialTable.id, Number(messageId)))
  .limit(1)

  if (testimony.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Testimony Available with this ID", data: testimony }
     
    );
  }
  return NextResponse.json({ message: "", success: true, data: testimony });
}
