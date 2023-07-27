import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("you are not authenticated");

    //checking the token
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) {
        console.error(err);
        return res.status(403).send("invalid token provided");
      }
      if (payload.id !== user._id.toString()) {
        return res.status(403).send("you can only delete your own account");
      }

      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).send("user not found.");

      res.status(200).send(`user ${deletedUser._id} is deleted.`);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error.");
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
