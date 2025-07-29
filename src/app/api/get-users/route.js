import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect.js';
import Team from '../models/teams.js';
import Member from '../models/users.js'; 
export async function GET() {
    try{
        await connectToDatabase();
       
        const team = await Member.find({})
        // const team = await Team.create({
        //     teamName: " Team Alpha",
        //     description: "This is a sample task description",
        //     createBy: "6883688467f357f0562544a2",
        //     members: ["6883688467f357f0562544a2", "6883688467f357f0562544a4"], 
        //     tasks: ["64f1aa01f0aab12345678920", "64f1aa01f0aab12345678921"],
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // })
        // console.log(team)
        return NextResponse.json(team, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}