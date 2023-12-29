import Booking from "../models/Booking.js";
import Review from "../models/Review.js";

// Middleware to check if the user is eligible to create a review for a specific movie
export const checkReviewEligibility = async (req, res, next) => {
    try {
      const { user, movie } = req.body;
  
      // Check if the user has completed any booking for the specified movie
      const hasCompletedBooking = await Booking.findOne({
        user: user,
        paymentStatus: 'completed',
      }).populate({
        path: 'movieScheduleRelationship',
        select: 'movie', // Chỉ lấy trường 'movie' từ bảng movieScheduleRelationship
      });
  
      if (!hasCompletedBooking || !hasCompletedBooking.movieScheduleRelationship) {
        return res.status(403).json({
          message: 'Bạn cần phải thanh toán một đơn đặt vé cho bộ phim này trước khi tạo đánh giá.',
        });
      }
  
      // Retrieve movieId from the completed booking
      const completedMovieId = hasCompletedBooking.movieScheduleRelationship.movie;
  
      // Check if the completed movieId matches the requested movie
      if (completedMovieId.toString() !== movie.toString()) {
        return res.status(403).json({
          message: 'Bạn cần phải thanh toán một đơn đặt vé cho bộ phim này trước khi tạo đánh giá.',
        });
      }
  
      const existingReview = await Review.findOne({
        user: user,
        movie: movie,
      });
  
      if (existingReview) {
        return res.status(403).json({
          message: 'Bạn đã đánh giá bộ phim này trước đó, mỗi người dùng chỉ được phép đánh giá một lần.',
        });
      }
  
      // Pass to the next middleware if the user is eligible
      next();
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  