import mongoose from "mongoose";

const lostFoundSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true
    },
    title: { type: String, required: true },
    description: String,
    location: String,
    image: String,
    contact: String
    
  },
  { timestamps: true }
);

const LostFound = mongoose.model("LostFound", lostFoundSchema);
export default LostFound;