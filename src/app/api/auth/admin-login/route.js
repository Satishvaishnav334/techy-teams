import Admin from "../models/admins.js";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const client = MongoDb();
    const admins = await Admin.find({});    
    console.log(admins);
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
}
}
