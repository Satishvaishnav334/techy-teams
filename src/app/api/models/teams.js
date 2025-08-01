import mongoose, { Schema } from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ["level 1", "level 2", "level 3"], default: "level 3" },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const teamModel = mongoose.models.Team || mongoose.model('Team', TeamSchema)

export default teamModel;