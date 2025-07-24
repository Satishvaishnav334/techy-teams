'use server';
import MongoDb from "../lib/connect.js";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const client = await MongoDb;
    const db = client.db('test');
    const users = await db.collection("Admin").find({}).toArray();
    console.log(users)
    return  NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}