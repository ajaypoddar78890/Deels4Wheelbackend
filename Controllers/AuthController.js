// import UserModel from "../Models/UserModel";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("user has been created ");
  } catch (error) {
    console.log(error);
    res.status(500).send("somewent wrong ");
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("user not found");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return res.status(403).send("username or password is wrong");

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    console.log(error);
    res.status(401).send("something went wrong ");
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
