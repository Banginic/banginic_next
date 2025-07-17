import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { newsletterSubscribersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Missing userId" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.id, Number(userId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Subscriber with such ID" },
      { status: 200 }
    );
  }
  const deletedNews = await db
    .delete(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.id, Number(userId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Subscriber deleted successfully." },
    { status: 202 }
  );
}
