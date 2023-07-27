import mongoose from "mongoose";

import { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    gigID: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
      require: true,
    },
    star: {
      type: Number,
      require: false,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("review", reviewSchema);
