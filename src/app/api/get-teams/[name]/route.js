import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import teamModel from '../../models/teams.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { name } = await params;
        const data = await teamModel.findOne({ slug: name });
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
        const { name } = await params;
        const data = await teamModel.deleteMany();
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
        const teamName = data.get("teamName");
        const slug = data.get('slug');
        const description = data.get("description");
        console.log(slug)
        const level = data.get("level");
        console.log(level)
        const rowmembers = data.getAll("members");
        const members = rowmembers
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);
        
        const task = await teamModel.updateOne(
            { slug: name }, 
            {
                $set: {
                    teamName, slug,
                    description, level, members,slug
                }
            });

        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}