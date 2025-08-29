import mongoose, { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" },

  },
  { timestamps: true }
);

const AdminModel = mongoose.models?.Admin || mongoose.model('Admin', AdminSchema)

export default AdminModel;