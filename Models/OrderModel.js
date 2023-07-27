import mongoose from "mongoose";

import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    gigID: {
      type: Number,
      require: true,
    },

    img: {
      type: String,
      require: false,
    },
    titile: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },

    buyerID: {
      type: String,
      require: true,
    },
    sellerID: {
      type: String,
      require: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
