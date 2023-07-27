import Gig from "../Models/GigModel.js";
import JWT from "jsonwebtoken";

export const createGig = async (req, res) => {
  if (!req.isSeller)
    return res.status(403).send("Only sellers can create a gig!");

  //directly checking the token for user authentication

  //token
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("you are not authenticated");

  JWT.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    const newGig = new Gig({
      userID: payload.id,
      ...req.body,
    });

    try {
      const savedGig = await newGig.save();
      // Handle successful save
      res.status(201).json(savedGig);
    } catch (error) {
      // Handle save error
      console.log(error);
    }
  });
};

//deleting gig

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userID !== req.userID) {
      res.status(401).send("you  can only delete your account ");
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(201).send("gig has been deleted");
  } catch (error) {
    console.log(error);
  }
};

// getting single gig

export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    res.status(201).send(gig);
  } catch (error) {
    console.log(error);
  }
};

// //getting multiple gigs

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userid && { userid: q.userid }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  //

  try {
    const gig = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(201).send(gig);
  } catch (error) {
    console.log(error);
  }
};
