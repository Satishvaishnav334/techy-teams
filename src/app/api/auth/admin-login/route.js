import userModel from "../../models/users.js";
import { NextResponse } from "next/server";
import MongoDb from "../../lib/connect.js";
export async function POST(request) {
  try {
    const {email, password} = await request.json();
    console.log(email, password);
    const user = await userModel.findOne({ email});    
    console.log("user",user);
    return NextResponse.json([user]);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
}
}
