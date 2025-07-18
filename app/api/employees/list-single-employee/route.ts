import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { employeeTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {

try{
    const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");

  if(!employeeId){
    return NextResponse.json({ success: false, message: 'Please provide Employee ID', data: []}, { status: 400})
  }
  const employee = await db.select()
  .from(employeeTable)
  .where(eq(employeeTable.id, Number(employeeId)))
  .limit(1)

  if (employee.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Employee Available with this ID", data: employee }
     
    );
  }
  return NextResponse.json({ message: "", success: true, data: employee });
}
    catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
