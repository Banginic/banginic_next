import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { newsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  const { message, subject } = body;

  if (!message || !subject) {
    return NextResponse.json(
      { error: "All fields are required", success: false },
      { status: 400 }
    );
  }
  const existingNews = await db.select().from(newsTable).limit(1);
  if (existingNews) {
    await db.delete(newsTable).where(eq(newsTable.id, 1));
  }
  await db.insert(newsTable).values({ subject, body: message });
  return NextResponse.json(
    { success: true, message: "News created successfully" },
    { status: 201 }
  );
}
