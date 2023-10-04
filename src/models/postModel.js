import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of your Post"],
    minLength: [4, "Title must be atleast 4 characters long"],
    maxLength: [80, "Title must be within 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please describe your Post"],
    minLength: [30, "Description must be atleast 30 characters long"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shared: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
});

export const postModel = mongoose.model("PostData", postSchema);
