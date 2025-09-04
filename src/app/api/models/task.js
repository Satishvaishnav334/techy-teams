import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true,unique:true, trim: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    priority: { type: String, enum: ["Low", "Medium", "Important"], default: "Medium" },
    status: { type: String, required: true, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date,default: Date.now  },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const taskModel = mongoose.models.Task || mongoose.model('Task', TaskSchema)

export default taskModel;