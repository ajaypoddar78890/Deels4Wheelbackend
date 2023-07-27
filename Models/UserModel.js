import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      // unique: true,
      sparse: true,
    },
    img: {
      type: String,
    },
    country: {
      type: String,
      requre: true,
    },

    desc: {
      type: "String",
      require: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
