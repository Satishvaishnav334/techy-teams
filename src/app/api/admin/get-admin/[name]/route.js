import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/connect.js';
import AdminModel from '@/app/api/models/Admin.js';
import bcrypt from 'bcrypt';

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        AdminModel;
        const { name } = await params;
        const data = await AdminModel.findOne({ name })
        // console.log(data)
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}