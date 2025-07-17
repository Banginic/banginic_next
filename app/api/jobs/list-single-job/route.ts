import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { jobTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if(!jobId){
    return NextResponse.json({ success: false, error: 'Please provide Job ID', data: []}, { status: 400})
  }
  const job = await db.select()
  .from(jobTable)
  .where(eq(jobTable.id, Number(jobId)))
  .limit(1)

  if (job.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Job available with this ID", data: [] },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "", success: true, data: job });
}
