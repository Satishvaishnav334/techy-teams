import userModel from "../../models/users";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const client = MongoDb();
    const user = await userModel.find({});    
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
}
}
