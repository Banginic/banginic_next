import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { messageTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {

try{
    const { searchParams } = new URL(req.url);
  const messageId = searchParams.get("messageId");

  if(!messageId){
    return NextResponse.json({ success: false, message: 'Please provide Message ID', data: []}, { status: 400})
  }
  const message = await db.select()
  .from(messageTable)
  .where(eq(messageTable.id, Number(messageId)))
  .limit(1)

  if (message.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Message Available with this ID", data: message }
     
    );
  }
  return NextResponse.json({ message: "", success: true, data: message });
}
    catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
