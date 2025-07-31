'use server'
import userModel from "../../models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import JsonWebToken from "jsonwebtoken";
import { cookies } from 'next/headers';
export async function POST(request) {
  try {

    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const hashedPassword = await hashPassword(password);
    // console.log(name, email, hashedPassword);
    const user = await userModel.create({ name, email, password: hashedPassword });
    // console.log(user);
    if (user) {
      const token = JsonWebToken.sign(
        { username: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
      );
      const name = user.name
      const cookiesStore = await cookies();
      const passtoken = cookiesStore.set('token', token);
      const passname = cookiesStore.set('name', name);
      return NextResponse.json({ status: 201 });
    }
    return NextResponse.json({ error: "Failed to Create User" }, { status: 400 });
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json({ error: "Failed to Created User" }, { status: 500 });
  }
}



async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

