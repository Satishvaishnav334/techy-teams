import userModel from "../../models/users.js";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { setCookie } from "cookies-next";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import connectToDatabase from "../../lib/connect.js";
export async function POST(request) {
  try {
    await connectToDatabase()
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await userModel.findOne({ $or: [{ email: email }, { name: email }] });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or Username" }, { status: 401 });
    }
    const name = user.name;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid  password" }, { status: 401 });
    }
    const isAdmin = user.role;
    if (isAdmin == 'user') {
      return NextResponse.json({ error: "unauthrorized Access Please login with Admin Account" }, { status: 401 });
    }
    const token = jwt.sign(
      { username: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
    )

    const cookiesStore = await cookies();
    const passtoken = cookiesStore.set('token', token);
    const passname = cookiesStore.set('name', name);


    return NextResponse.json({ user }, { status: 200 })


  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
