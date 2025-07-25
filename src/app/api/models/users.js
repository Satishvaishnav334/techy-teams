import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    linkedin: { type: String, trim: true },
    higherEducation: { type: String, trim: true },
    currentJobRole: { type: String, trim: true },
    college: { type: String, trim: true },
    achievements: { type: String, trim: true },
    github: { type: String, trim: true },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const userModel = mongoose.model("user", UserSchema);

export default userModel;