import express from "express";
import { deleteUser, getUser } from "../Controllers/UserController.js";
// import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
