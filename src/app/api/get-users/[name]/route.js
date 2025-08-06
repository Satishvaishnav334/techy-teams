import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js';
import teamModel from '../../models/teams.js';
import taskModel from '../../models/task.js';
import bcrypt from 'bcrypt';

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
                path: 'members createdBy', // Populates children of children
            },
            
        }).populate('tasks')
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
        const username = data.get("name");
        const email = data.get("email");
        const rowpassword = data.get("password");
        const oldPassword = data.get("oldPassword");
        const password = await hashPassword(rowpassword)
        console.log(email)
        const user = await Member.findOne({ name })

        if (!user) {
            return NextResponse.json({ message: "Invalid User" }, { status: 403 });
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid Old Password" }, { status: 403 });
        }
        const userUpdate = await Member.updateOne(
            { name },
            {
                $set: {
                    name: username, email, password
                }
            });

        return NextResponse.json(userUpdate, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
