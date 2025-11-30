import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  brand: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  location: String,
  images: [String],
  status: {
    type: String,
    default: "available"
  }
}, { timestamps: true });

export default mongoose.model("Car", carSchema);
