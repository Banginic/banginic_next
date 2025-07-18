import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { employeeTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
try{
    const searchParams = new URL(req.url).searchParams;
  const employeeId = searchParams.get("employeeId");

  if (!employeeId) {
    return NextResponse.json(
      { success: false, error: "Missing Employee Id" },
      { status: 400 }
    );
  }
  const existInDB = await db
    .select()
    .from(employeeTable)
    .where(eq(employeeTable.id, Number(employeeId)))
    .limit(1);

  if (existInDB.length === 0) {
    return NextResponse.json(
      { success: false, error: "No employee with such ID" },
      { status: 404 }
    );
  }
  const deletedNews = await db
    .delete(employeeTable)
    .where(eq(employeeTable.id, Number(employeeId)))
    .returning();

  return NextResponse.json(
    { success: true, data: deletedNews, message: "Employee deleted successfully.",  },
    { status: 203 }
  );
}
   catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}