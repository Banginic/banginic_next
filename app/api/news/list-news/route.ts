import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { newsTable } from "@/drizzle/schema";

export async function GET(){
    const news = await db.select()
    .from(newsTable)

    if(news.length === 0){
        return NextResponse.json({ success: true, message: 'No News available', data:[]}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:news})
}