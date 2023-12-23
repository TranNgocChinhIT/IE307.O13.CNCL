import Booking from "../models/Booking.js";
import User from "../models/User.js";
import MovieScheduleRelationship from "../models/movieScheduleRelationship.js";
import bookingValidator from "../validation/Booking.js";
import mongoose from "mongoose";
// Lấy danh sách Booking
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh sách đặt vé",
            });
        }
        return res.status(200).json({
            datas: bookings,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Lấy thông tin một Booking từ ID
export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate({
            path: 'user movieScheduleRelationship',
            select: '-seats -password', // Bỏ trường 'seats'
        })
     
        if (!booking) {
            return res.status(404).json({
                message: "Không tìm thấy đặt vé",
            });
        }
        return res.status(200).json({
            datas: booking,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
    // Lấy danh sách Booking cho một User cụ thể
    export const getAllBookingsForUser = async (req, res) => {
        try {
            const userId = req.params.id; // Giả sử ID của người dùng được truyền trong tham số của yêu cầu
            const bookings = await Booking.find({ user: userId })
                .populate({
                    path: 'movieScheduleRelationship',
                    populate: [
                        {
                            path: 'movie',
                            model: 'Movie',
                        },
                        {
                            path: 'schedule',
                            model: 'Schedule',
                        }
                    ],
                    select: 'movie schedule',
                });
                
            if (!bookings || bookings.length === 0) {
                return res.status(404).json({
                    message: "Không tìm thấy danh sách đặt vé cho người dùng này",
                });
            }

            return res.status(200).json({
                datas: bookings,
            });
        } catch (error) {
            return res.status(500).json({
                name: error.name,
                message: error.message,
            });
        }
    };



// Tạo mới một Booking
export const createBooking = async (req, res) => {
    try {
        const { user, movieScheduleRelationship } = req.body;

        // Kiểm tra xem user và movieScheduleRelationship có tồn tại không
        const existingUser = await User.findById(user);
        const existingMovieScheduleRelationship = await MovieScheduleRelationship.findById(movieScheduleRelationship);

        if (!existingUser || !existingMovieScheduleRelationship) {
            return res.status(404).json({
                message: "User hoặc MovieScheduleRelationship không tồn tại",
            });
        }

        const { error } = bookingValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const newBooking = await Booking.create(req.body);

        if (!newBooking) {
            return res.status(400).json({
                message: "Tạo đặt vé không thành công",
            });
        }

        return res.status(201).json({
            datas: newBooking,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Hàm cập nhật trạng thái ghế trong bảng movieScheduleRelationship
const updateSeatsStatus = async (movieScheduleRelationshipId, selectedSeats) => {
    try {
        const movieScheduleRelationship = await MovieScheduleRelationship.findById(movieScheduleRelationshipId);
        if (!movieScheduleRelationship) {
            return null;
        }

        // Lặp qua các ghế được chọn và cập nhật trạng thái
        for (const seatId of selectedSeats) {
            const seatIndex = movieScheduleRelationship.seats.flat().findIndex(seat => seat._id == seatId);
            if (seatIndex !== -1) {
                movieScheduleRelationship.seats.flat()[seatIndex].taken = true;
            }
        }

        // Lưu lại bảng movieScheduleRelationship
        await movieScheduleRelationship.save();

        return movieScheduleRelationship;
    } catch (error) {
        throw error;
    }
};
  export const updateBooking = async (req, res) => {
    try {
      const { error } = bookingValidator.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (req.body.paymentStatus === 'completed') {
        const movieScheduleRelationshipId = req.body.movieScheduleRelationship;
        const updatedSeats = await updateSeatsStatus(movieScheduleRelationshipId, req.body.selectedSeats);
        if (!updatedSeats) {
            return res.status(500).json({
                message: "Cập nhật trạng thái ghế không thành công",
            });
        }
      }
  
      if (!updatedBooking) {
        return res.status(404).json({
          message: "Cập nhật không thành công!!",
        });
      }
  
      return res.status(200).json({
        datas: updatedBooking,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };

// Xóa một Booking
export const removeBooking = async (req, res) => {
    try {

        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({
                message: "Xóa không thành công!!",
            });
        }

        return res.status(200).json({
            message: "Xóa đặt vé thành công",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
