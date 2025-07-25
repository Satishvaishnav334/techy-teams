import userModel from "../../models/users.js";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    console.log(email, password);  
    
    const user = await userModel.findOne({ email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = jwt.sign(
      { username: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
    )
    await cookies().set('token', token)
    return NextResponse.json({ user, token }, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
