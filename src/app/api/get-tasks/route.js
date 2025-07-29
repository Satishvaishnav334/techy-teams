import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect';
import Team from '../models/teams.js';
import Member from '../models/users.js'; 

export async function GET() {
    try{
        await connectToDatabase();
       
        const task = await Task.find({})
        console.log(task)
        return NextResponse.json(task, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST() {
    try{
        await connectToDatabase();
       
        const task = await Task.create({
            
        })
        console.log(task)
        return NextResponse.json(task, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}