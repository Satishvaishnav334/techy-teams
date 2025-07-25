'use server';
import MongoDb from "../lib/connect.js";
import user from "../models/users.js";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const client = MongoDb();
    const users = await user.find({});
    console.log(users)
    return  NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}