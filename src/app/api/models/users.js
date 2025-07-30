import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    team: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  },
  { timestamps: true }
); 

const userModel = mongoose.models.Member || mongoose.model('Member', UserSchema)

export default userModel;