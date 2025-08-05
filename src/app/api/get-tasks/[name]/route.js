'use server'
import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import taskModel from '../../models/task.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { name } = await params;
        const data = await taskModel.findOne({ slug: name });
        console.log(data)
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        await connectToDatabase();
        const { name } = await params;
        const data = await req.formData();
        const title = data.get("title");
        const description = data.get("description");
        const slug = data.get('slug');
        const priority = data.get("priority");
        const status = data.get("status");
        const dueDate = data.get("dueDate");
        const rowassignTo = data.getAll("assignedTo");
        const assignedTo = rowassignTo
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
      
        const task = await taskModel.updateOne(
            { slug: name },
            {
                $set: {
                    title,
                     description,slug,  priority,  status, assignedTo, dueDate
                }
            });

        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
