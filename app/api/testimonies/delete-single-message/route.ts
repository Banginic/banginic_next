import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { testimonialTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
try{
    const searchParams = new URL(req.url).searchParams;
  const testimonyId = searchParams.get("testimonyId");

  if (!testimonyId) {
    return NextResponse.json(
      { success: false, error: "Missing Testimony Id" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(testimonialTable)
    .where(eq(testimonialTable.id, Number(testimonyId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No testimony with such ID" },
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(testimonialTable)
    .where(eq(testimonialTable.id, Number(testimonyId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Testimony deleted successfully.",  },
    { status: 203 }
  );
}
   catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}