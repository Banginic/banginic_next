import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { eq, and } from "drizzle-orm";
import { jobTable } from "@/drizzle/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, location, description, latestDate } = body;

  if (!title || !location || !description || !latestDate) {
    return NextResponse.json(
      { success: false, error: "All fields are required." },
      { status: 400 }
    );
  }
  const existJob = await db
    .select()
    .from(jobTable)
    .where(
      and(
        eq(jobTable.title, title),
        eq(jobTable.location, location),
        eq(jobTable.description, description)
      )
    )
    .limit(1);

  if (existJob.length === 1) {
    return NextResponse.json(
      { error: "Job title already exist.", success: false },
      { status: 400 }
    );
  }
  const job = await db.insert(jobTable)
  .values({
    title, location, description, latestDate
  })
  return NextResponse.json({ success: true, message: 'Job created successfully'}, { status: 201})
}
