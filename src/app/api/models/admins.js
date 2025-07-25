import mongoose, { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    achievements: { type: String, trim: true },
    github: { type: String, trim: true },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;