import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect';
import Team from '../models/teams.js';
import Member from '../models/users.js';

export async function GET() {
    try {
        await connectToDatabase();
        Member;
        const team = await Team.find({}).populate('members', 'name email role').populate('tasks')
        // console.log(team)
        return NextResponse.json(team, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();
        const formData = await req.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const createBy = formData.get('createBy');
        const rowmembers = formData.getAll('members');
        const members = rowmembers
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
        const team = await Team.create({
            teamName: title, description, createBy
            ,members 
        })
        return NextResponse.json(team, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}