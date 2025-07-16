import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { newsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const newsId = searchParams.get("newsId");

  if (!newsId) {
    return NextResponse.json(
      { success: false, error: "Missing newsId" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, Number(newsId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No news with such ID" },
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(newsTable)
    .where(eq(newsTable.id, Number(newsId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "News deleted successfully." },
    { status: 200 }
  );
}
