import userModel from "../../models/users.js";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import brecrypt from "bcrypt";
import connectToDatabase from "../../lib/connect.js";
export async function POST(request) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const user = await userModel.findOne({ $or: [{ email: email }, { name: email }] });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const isPasswordValid = await brecrypt.compare(password, user.password);
    console.log(isPasswordValid)
    const name = user.name
    // console.log("user 1", user);
    if (!isPasswordValid) { return NextResponse.json({ error: "Invalid email or password" }, { status: 401 }); }
    const token = jwt.sign(
      { username: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
    )
     const cookiesStore = await cookies();
    const passtoken = cookiesStore.set('token', token);
    const passname = cookiesStore.set('name', name);;
    return NextResponse.json({  token }, { status: 200 })


  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
