import adminModel from "../../models/Admin.js";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { encrypt } from "@/lib/auth.js";
import brecrypt from "bcrypt";
import connectToDatabase from "../../lib/connect.js";
export async function POST(request) {
  try {
    connectToDatabase();
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const user = await adminModel.findOne({ $or: [{ email: email }, { name: email }] });
    if (!user) {
      return NextResponse.json({ error: "Invalid email  " }, { status: 401 });
    }
    // console.log(user)
    const isPasswordValid = await brecrypt.compare(password, user.password);
    console.log(isPasswordValid) //check password correct or not
    
   
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
