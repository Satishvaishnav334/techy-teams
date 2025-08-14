import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import teamModel from '../../models/teams.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const data = await teamModel.findOne({ slug });
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
        const team = await teamModel.findOne({ slug })
        console.log(team._id)
        const olduser = await Member.updateMany({
            _id: team.members
        },
            { $pull: { team: team._id } },
            { new: true }
        )
        
        const data = await teamModel.deleteOne({slug});
        console.log(data)
        return NextResponse.json({ message: "Team Deleted Successfully" }, { status: 200 });
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
        const teamName = data.get("teamName");
        const newslug = data.get('slug');
        const description = data.get("description");
        const level = data.get("level");

        const rowmembers = data.getAll("members");
        const members = rowmembers
            .flatMap(item => item.split(','))
            .map(id => id.trim())
            .filter(Boolean);

        const team = await teamModel.findOne({ slug })
        console.log(team._id, "team Id")

        const olduser = await Member.updateMany({
            _id: team.members
        },
            { $pull: { team: team._id } },
            { new: true }
        )


        const teamupdate = await teamModel.updateOne(
            { slug },
            {
                $set: {
                    teamName, slug: newslug,
                    description, level, members, slug
                }
            });

        const user = await Member.updateMany({
            _id: members
        },
            {
                $addToSet:
                {
                    team: { _id: team._id }
                }
            }
        )
        console.log(user)

        return NextResponse.json(team, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}