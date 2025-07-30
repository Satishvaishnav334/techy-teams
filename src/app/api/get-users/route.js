import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect.js';
import Team from '../models/teams.js';
import Member from '../models/users.js'; 
export async function GET() {
    try{
        await connectToDatabase();
       
        const data = await Member.find({})
        return NextResponse.json(data, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}