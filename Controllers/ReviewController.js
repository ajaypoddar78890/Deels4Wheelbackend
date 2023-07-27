import Review from "../Models/ReviewModel.js";
export const creatReviews = async (req, res) => {
  if (req.isSeller) {
    res.status(301).send("seller can not create a review");
  }

  const newReview = new Review({
    userID: req.userID,
    gigID: req.body.gigID,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      userID: req.userID,
      gigID: req.body.gigID,
    });

    if (review) {
      res.status(401).send("you have already created review for this gig");
    }

    const savedReview = await newReview.save();
    res.status(201).send({
      review: savedReview,
      message: "Review has been created.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = async (req, res) => {
  const review = await Review.find({ gigID: req.params.gigID });
  res.status(200).send(review);
};

export const deleteReviews = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(201).send(review, "reviw has been deleted");
  } catch (error) {
    console.log(error);
  }
};
