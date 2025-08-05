import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js'; 
import teamModel from '../../models/teams.js';
export async function GET(req,{params}) {
    try{
        await connectToDatabase();
       const {name} = await params;
        const data = await teamModel.findOne({teamName:name});
        return NextResponse.json(data, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        await connectToDatabase();
        const { name } = await params;
        const data = await req.formData();
        const teamName = data.get("teamName");
        const description = data.get("description");
        console.log(teamName)
        const level = data.get("level");
        console.log(level)
        const rowmembers = data.getAll("members");
        const members = rowmembers
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
            // console.log(assignedTo,rowassignTo)
        const task = await teamModel.updateOne(
            { teamName:name },
            {$set:{teamName:teamName,
                description:description,level:level,members:members,
            }
        });

        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}