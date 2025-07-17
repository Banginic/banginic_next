import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { messageTable } from "@/drizzle/schema";

export async function GET(){
    const messages = await db.select()
    .from(messageTable)

    if(messages.length === 0){
        return NextResponse.json({ success: false, error: 'No Message available', data:[]}, { status: 404})
    }
    return NextResponse.json({ message: '', success: true, data:messages})
}