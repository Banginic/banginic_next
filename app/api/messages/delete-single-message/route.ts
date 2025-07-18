import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { messageTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const messageId = searchParams.get("messageId");

  if (!messageId) {
    return NextResponse.json(
      { success: false, error: "Missing Message Id" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(messageTable)
    .where(eq(messageTable.id, Number(messageId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No message with such ID" },
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(messageTable)
    .where(eq(messageTable.id, Number(messageId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Message deleted successfully.",  },
    { status: 203 }
  );
}