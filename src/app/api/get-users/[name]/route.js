import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import teamModel from '../../models/teams.js';
import taskModel from '../../models/task.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        teamModel;
        taskModel;
         Member;
        const { name } = await params;
        const data = await Member.findOne({ name }).populate({
            path: 'team',
            populate: {
                path: 'members', // Populates children of children
            }
        }).populate('tasks')
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}