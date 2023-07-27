import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import UserRoute from "./Routes/UserRoute.js";
import ReveiwRoute from "./Routes/ReviewRoutes.js";
// import OrderRoute from "./Routes/OrderRoutes.js";
import MessageRoute from "./Routes/MessageRoute.js";
import GigRoute from "./Routes/GigRoute.js";
import ConverSationRoute from "./Routes/ConverSationRoutes.js";
import AuthRoute from "./Routes/AuthRoute.js";
const PORT = process.env.PORT || 5500;

//config
const app = express();
dotenv.config();

// middlewere
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//connecting to the DB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
};

//Routes
app.use("/api/user", UserRoute);
app.use("/api/review", ReveiwRoute);
app.use("/api/order", OrderRoute);
app.use("/api/message", MessageRoute);
app.use("/api/gigs", GigRoute);
app.use("/api/conversation", ConverSationRoute);
app.use("/api/conversation", ConverSationRoute);
app.use("/api/auth", AuthRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("this app is ruuning at 5500");
});
