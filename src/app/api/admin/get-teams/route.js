import { NextResponse } from 'next/server';
import Task from '../../models/task.js';
import connectToDatabase from '../../lib/connect';
import Team from '../../models/teams.js';
import Member from '../../models/users.js';

export async function GET() {
    try {
        await connectToDatabase();
        Member;
        const team = await Team.find({}).populate('members', 'name email role')
        // console.log(team)
        const io = globalThis.server?.io;
        if (io) {
            io.emit("notification", { message: `All Task fetched}` });
        }
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

        const teamName = formData.get('teamName');
        const slug = formData.get('slug');
        const level = formData.get('level');
        const description = formData.get('description');
        const createdBy = formData.get('createdBy');
        const rowmembers = formData.getAll('members');
        console.log("object", slug)
        const members = rowmembers
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
        const team = await Team.create({
            teamName, description, createdBy, level, members, slug
        })
        const users = await Member.updateMany(
            {
                _id: { $in: members }
            },
            {
                $addToSet: { team: team._id }
            }
        )
        console.log(team)
        return NextResponse.json(team, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}