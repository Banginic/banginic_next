import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { messageTable } from "@/drizzle/schema";

export async function GET(){
    const messages = await db.select()
    .from(messageTable)

    if(messages.length === 0){
        return NextResponse.json({ success: true, message: 'No Message available', data:messages}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:messages})
}