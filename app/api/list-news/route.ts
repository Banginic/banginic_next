import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { newsTable } from "@/drizzle/schema";

export async function GET(){
    const news = await db.select()
    .from(newsTable)

    if(news.length === 0){
        return NextResponse.json({ success: false, message: 'No News available', data:[]}, { status: 404})
    }
    return NextResponse.json({ message: '', success: true, data:news})
}