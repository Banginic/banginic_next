import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { newEmployeeTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {

 try{
   const { searchParams } = new URL(req.url);
  const jobApplicationId = searchParams.get("jobApplicationId");

  if(!jobApplicationId){
    return NextResponse.json({ success: false, message: 'Please provide Job application ID', data: []}, { status: 400})
  }
  const message = await db.select()
  .from(newEmployeeTable)
  .where(eq(newEmployeeTable.id, Number(jobApplicationId)))
  .limit(1)

  if (message.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Job application Available with this ID", data: [] }
     
    );
  }
  return NextResponse.json({ message: "", success: true, data: message });
 }
  catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
