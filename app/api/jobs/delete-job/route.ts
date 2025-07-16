import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { jobTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      { success: false, error: "Missing job Id" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(jobTable)
    .where(eq(jobTable.id, Number(jobId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No job with such ID" },
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(jobTable)
    .where(eq(jobTable.id, Number(jobId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Job deleted successfully.",  },
    { status: 200 }
  );
}
