import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { newEmployeeTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
 try{
   const searchParams = new URL(req.url).searchParams;
  const jobApplicationId = searchParams.get("jobApplicationId");

  if (!jobApplicationId) {
    return NextResponse.json(
      { success: false, error: "Missing Job Application ID" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(newEmployeeTable)
    .where(eq(newEmployeeTable.id, Number(jobApplicationId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No Job application with such ID.", data: []},
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(newEmployeeTable)
    .where(eq(newEmployeeTable.id, Number(jobApplicationId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Job application deleted successfully.",  },
    { status: 203 }
  );
 } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}