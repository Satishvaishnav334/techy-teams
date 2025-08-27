import { NextRequest, NextResponse } from "next/server";
import taskModel from "../../../models/task";
export async function PUT(req) {
    try {
        const formData = await req.formData();
        const taskId = formData.get('taskId')
        const newStatus = formData.get('newStatus')
        const task = await taskModel.findById({_id:taskId})
        const up = await task.updateOne({status:newStatus});
        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}