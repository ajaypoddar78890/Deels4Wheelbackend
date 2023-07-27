import mongoose from "mongoose";
import { Schema } from "mongoose";

const CarSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    cat: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: false,
    },

    desc: {
      type: String,
      required: true,
    },
    shortdesc: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    feature: {
      type: [String],
      required: false,
    },
    totalstars: {
      type: Number,
      default: 0,
    },
    startNumber: {
      type: Number,
      default: 0,
    },

    deliveryTime: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("gigs", CarSchema);
