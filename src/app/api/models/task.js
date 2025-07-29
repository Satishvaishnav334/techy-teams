import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    status: { type: String, required: true, enum: ["pending", "in-progress", "completed"], default: "pending" },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Member', required: true }],
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    dueDate: { type: Date,},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
); 

const taskModel = mongoose.models.Task || mongoose.model('Task', TaskSchema)

export default taskModel;