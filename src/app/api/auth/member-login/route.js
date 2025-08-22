import userModel from "../../models/users.js";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { setCookie } from "cookies-next";
import { encrypt } from "@/lib/auth.js";
import brecrypt from "bcrypt";
import connectToDatabase from "../../lib/connect.js";
export async function POST(request) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const user = await userModel.findOne({ $or: [{ email: email }, { name: email }] });
    if (!user) {
      return NextResponse.json({ error: "Invalid email  " }, { status: 401 });
    }
    const isPasswordValid = await brecrypt.compare(password, user.password);
    console.log(isPasswordValid)
   
    if (!isPasswordValid) { return NextResponse.json({ error: "Invalid  password" }, { status: 401 }); }
    const tokenuser =  { username: user.name, email: user.email ,role: user.role}
    const token = await encrypt(tokenuser)
   
    const cookiesStore = await cookies();
    cookiesStore.set('token', token);
    return NextResponse.json({message:"Login Successfully"} ,{ status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}
