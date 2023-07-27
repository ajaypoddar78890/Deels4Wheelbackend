import express from "express";
import { verifyToken } from "../middlewere/jwt.js";
import {
  creatReviews,
  deleteReviews,
  getReviews,
} from "../Controllers/ReviewController.js";

const router = express.Router();

router.post("/", verifyToken, creatReviews);
router.get("/:gigID", getReviews);
router.delete("/:id", deleteReviews);

export default router;
