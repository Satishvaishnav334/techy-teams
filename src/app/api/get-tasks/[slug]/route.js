'use server'
import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import taskModel from '../../models/task.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        Member;
        const { slug } = await params;
        const data = await taskModel.findOne({ slug }).populate('assignedTo', 'name email role');
        console.log(data)
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const task = await taskModel.findOne({ slug })
        const taskremove = await Member.updateMany({
            _id: task.members
        }, {
            $pull: { tasks: task._id }
        })
        const data = await taskModel.deleteOne({ slug });
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
        const { slug } = await params;
        const data = await req.formData();
        const title = data.get("title");
        const description = data.get("description");
        const newslug = data.get('slug');
        const priority = data.get("priority");
        const status = data.get("status");
        const dueDate = data.get("dueDate");
        const assignedTo = data.get("assignedTo");
        const task = await taskModel.findOne({ slug })
        const taskremove = await Member.updateMany({
            _id: task.members
        }, {
            $pull: { tasks: task._id }
        })

        const taskupdate = await taskModel.updateOne(
            { slug },
            {
                $set: {
                    title,
                    description, slug: newslug, priority, status, assignedTo, dueDate
                }
            }
        );

        const userupdate = await Member.updateMany({
            _id: assignedTo
        }, {
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
