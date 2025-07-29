import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect';
import Team from '../models/teams.js';
import Member from '../models/users.js';

export async function GET() {
    try {
        await connectToDatabase();

        const task = await Task.find({}).populate('assignedTo', 'name email role').populate('team', 'name description');
        console.log(task)
        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const data = await request.formData();
        const title = data.get("title");
        const status = data.get("status");
        const dueDate = data.get("dueDate");
        const description = data.get("description");
        const createdBy = data.get("createBy");
        const rowassignTo = data.getAll("assignTo");
        const assignedTo = rowassignTo
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);

        console.log(title, description, createdBy, dueDate,assignedTo)
        const team = await Task.create({
            title, description, createdBy, assignedTo, dueDate, status
        })
        console.log(team)
        return NextResponse.json(team, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}