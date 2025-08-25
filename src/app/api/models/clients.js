import mongoose, { Schema } from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true,  trim: true },
    message: { type: String, required: true,  trim: true },
  },
  { timestamps: true }
); 

const clientModel = mongoose.models?.Clients || mongoose.model('Client', ClientSchema)

export default clientModel;