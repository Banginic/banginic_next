import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { projectTable } from "@/drizzle/schema";

export async function GET(){
   try{
     const projects = await db.select()
    .from(projectTable)

    if(projects.length === 0){
        return NextResponse.json({ success: true, message: 'No Project Available', data:projects}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:projects})
   } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
  
}