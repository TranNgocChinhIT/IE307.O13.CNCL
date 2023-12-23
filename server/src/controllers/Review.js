// Import necessary models and dependencies
import { checkReviewEligibility } from "../middlewares/reviewMiddleware.js";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import reviewValidator from "../validation/Review.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy đánh giá nào",
      });
    }
    return res.status(200).json({
      datas: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Get review by ID
export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate({
        path: "user",
        select: "-password", // Exclude 'seats' field
      });

    if (!review) {
      return res.status(404).json({
        message: "Không tìm thấy đánh giá",
      });
    }

    return res.status(200).json({
      datas: review,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    // Use the middleware to check eligibility
    await checkReviewEligibility(req, res, async () => {
      const { user } = req.body;

      // Check if user exists
      const existingUser = await User.findById(user);

      if (!existingUser) {
        return res.status(404).json({
          message: "User không tồn tại",
        });
      }

      const { error } = reviewValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }

      const newReview = await Review.create(req.body);

      if (!newReview) {
        return res.status(400).json({
          message: "Tạo đánh giá không thành công",
        });
      }

      return res.status(201).json({
        datas: newReview,
      });
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { error } = reviewValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: "Cập nhật không thành công",
      });
    }

    return res.status(200).json({
      datas: updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Remove a review
export const removeReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({
        message: "Xóa không thành công",
      });
    }

    return res.status(200).json({
      message: "Xóa đánh giá thành công",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
