import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { employeeTable } from "@/drizzle/schema";

export async function GET() {
  try {
    const employees = await db.select().from(employeeTable);

    if (employees.length === 0) {
      return NextResponse.json(
        { success: true, message: "No Employee Available", data: employees },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "", success: true, data: employees });
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json(
      { message: "Server error", error, success: false },
      { status: 500 }
    );
  }
}
