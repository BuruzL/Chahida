import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    type: { type: String, default: "sell" },
    title: String,
    price: Number,
    condition: String,
    description: String,
    contact: String,
    image: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;