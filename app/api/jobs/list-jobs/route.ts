import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { jobTable } from "@/drizzle/schema";

export async function GET(){
    const job = await db.select()
    .from(jobTable)

    if(job.length === 0){
        return NextResponse.json({ success: true, message: 'No Job available', data:[]}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:job})
}