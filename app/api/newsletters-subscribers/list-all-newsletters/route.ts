import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { newsletterSubscribersTable } from "@/drizzle/schema";

export async function GET(){
    const news = await db.select()
    .from(newsletterSubscribersTable)

    if(news.length === 0){
        return NextResponse.json({ success: true, message: 'No Subscribers Available', data:news}, { status: 200})
    }
    return NextResponse.json({ message: '', success: true, data:news})
}