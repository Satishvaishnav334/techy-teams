import { NextResponse } from 'next/server';
import Task from '../models/task.js';
import connectToDatabase from '../lib/connect';
import Member from '../models/users.js';

export async function GET() {
    try {
        await connectToDatabase();
        Member;
        const data = await Task.find({}).populate('assignedTo', 'name email role')
        return NextResponse.json(data, { status: 200 });
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
        const description = data.get("description");
        const priority = data.get("priority");
        const status = data.get("status");
        const dueDate = data.get("dueDate");
        const createdBy = data.get("createdBy");
        const rowassignTo = data.getAll("assignTo");
        const assignedTo = rowassignTo
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
        console.log(assignedTo)
        const task = await Task.create({
            title, description, createdBy, assignedTo, dueDate, status,priority
        })
        console.log(task)
        const users = await Member.updateMany(
            {
                _id: {$in:assignedTo}
            },
            {
                $addToSet: { tasks: task._id }
            }
        )

        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}