import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { projectTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {

try{
    const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if(!projectId){
    return NextResponse.json({ success: false, message: 'Please provide Project ID', data: []}, { status: 400})
  }
  const project = await db.select()
  .from(projectTable)
  .where(eq(projectTable.id, Number(projectId)))
  .limit(1)

  if (project.length === 0) {
    return NextResponse.json(
      { success: true, message: "No Project Available with this ID", data: project }
     
    );
  }
  return NextResponse.json({ message: "", success: true, data: project });
}
    catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}
