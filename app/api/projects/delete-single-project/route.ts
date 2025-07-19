import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { projectTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
try{
    const searchParams = new URL(req.url).searchParams;
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { success: false, error: "Missing Project ID" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, Number(projectId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No Project with such ID" },
      { status: 404 }
    );
  }
  const deletedProject = await db
    .delete(projectTable)
    .where(eq(projectTable.id, Number(projectId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedProject, message: "Project deleted successfully.",  },
    { status: 203 }
  );
}
   catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}