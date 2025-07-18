import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { testimonialTable } from "@/drizzle/schema";

export async function GET(){
   try{
     const messages = await db.select()
    .from(testimonialTable)

    if(messages.length === 0){
        return NextResponse.json({ success: true, message: 'No Testimony Available', data:messages}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:messages})
   } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ message: "Server error", error, success: false }, { status: 500 });
  }
}