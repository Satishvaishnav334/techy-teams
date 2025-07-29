import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/connect.js';
import Member from '../../models/users.js'; 
export async function GET(req) {
    try{
        await connectToDatabase();
       const user = "satish";
       console.log(user)
        const team = await Member.findOne({name:user});
        console.log(team)
        return NextResponse.json(team, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}