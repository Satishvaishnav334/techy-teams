'use server'
import { NextRequest, NextResponse } from "next/server";
import clientModel from "../models/clients";
import connectToDatabase from "../lib/connect";
export async function POST(request) {
  try {
    console.log("object")
    connectToDatabase()
    clientModel;
    const data = await request.formData();
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const email = data.get("email");
    const message = data.get("message");
    const client = await clientModel.create({ firstname, email, lastname, message });
    console.log(client);
    if (client) {
     
      return NextResponse.json({ message: "Your Request Collected Successfully " }, { status: 201 });
    }
    return NextResponse.json({ message: "Failed to Create Request" }, { status: 400 });
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json({ message: "Failed to Created Request" }, { status: 500 });
  }
}

