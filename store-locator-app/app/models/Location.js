import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: String,
    address1: String,
    address2: String,
    city: String,
    zip: String,
    state: String,
    country: String,
    phone: String,
    website: String,
    email: String,
  },
  { timestamps: true }
);

// Prevent model overwrite during development
export const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
