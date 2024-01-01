import Booking from "../models/Booking.js";
import User from "../models/User.js";
import MovieScheduleRelationship from "../models/movieScheduleRelationship.js";
import bookingValidator from "../validation/Booking.js";
import mongoose from "mongoose";
import schedule from "node-schedule";
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

        if (req.body.paymentStatus === 'pending') {
            const movieScheduleRelationshipId = req.body.movieScheduleRelationship;
            const updatedSeats = await updateSeatsStatusPending(movieScheduleRelationshipId, req.body.selectedSeats);
            if (!updatedSeats) {
                return res.status(500).json({
                    message: "Cập nhật trạng thái ghế không thành công",
                });
            }
          }

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
// Hàm cập nhật trạng thái ghế pending trong bảng movieScheduleRelationship
const updateSeatsStatusPending = async (movieScheduleRelationshipId, selectedSeats) => {
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
                movieScheduleRelationship.seats.flat()[seatIndex].selected = true;
            }
        }

        // Lưu lại bảng movieScheduleRelationship
        await movieScheduleRelationship.save();

        return movieScheduleRelationship;
    } catch (error) {
        throw error;
    }
};
const updateSeatsStatusCanceled = async (movieScheduleRelationshipId, selectedSeats) => {
    try {
        const movieScheduleRelationship = await MovieScheduleRelationship.findById(movieScheduleRelationshipId);
        if (!movieScheduleRelationship) {
            return null;
        }

        // Lặp qua các ghế được chọn và cập nhật trạng thái
        for (const seatId of selectedSeats) {
            const seatIndex = movieScheduleRelationship.seats.flat().findIndex(seat => seat._id == seatId);
            if (seatIndex !== -1) {
                movieScheduleRelationship.seats.flat()[seatIndex].taken = false;
                movieScheduleRelationship.seats.flat()[seatIndex].selected = false;
            }
        }

        // Lưu lại bảng movieScheduleRelationship
        await movieScheduleRelationship.save();

        return movieScheduleRelationship;
    } catch (error) {
        throw error;
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
                movieScheduleRelationship.seats.flat()[seatIndex].selected = false;
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
      console.log(req.body.movieScheduleRelationship,req.body.selectedSeats)
      if (req.body.paymentStatus === 'completed') {
        const movieScheduleRelationshipId = req.body.movieScheduleRelationship;
        const updatedSeats = await updateSeatsStatus(movieScheduleRelationshipId, req.body.selectedSeats);
        if (!updatedSeats) {
            return res.status(500).json({
                message: "Cập nhật trạng thái ghế không thành công",
            });
        }
    } else if (req.body.paymentStatus === 'canceled') {
        const movieScheduleRelationshipId = req.body.movieScheduleRelationship;
        const updatedSeats = await updateSeatsStatusCanceled(movieScheduleRelationshipId, req.body.selectedSeats);
        if (!updatedSeats) {
            return res.status(500).json({
                message: "Cập nhật trạng thái ghế không thành công",
            });
        }

        // Xóa đặt vé
        await Booking.findByIdAndDelete(req.params.id);
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
// Hàm để tự động xóa các đặt vé có paymentStatus = 'pending' sau 1 ngày
const autoDeletePendingBookings = async () => {
    try {
        // Lấy tất cả đặt vé chưa hoàn thành và có paymentStatus là 'pending'
        const pendingBookings = await Booking.find({
            paymentStatus: 'pending',
            createdAt: { $lt: new Date(Date.now() -  1*60* 60 * 1000) } // Lọc các đặt vé tạo trước 1 ngày
        });

        // Xóa các đặt vé thỏa mãn điều kiện
        for (const booking of pendingBookings) {
            const movieScheduleRelationshipId = booking.movieScheduleRelationship.toString();
            const selectedSeats = booking.selectedSeats.map(seat => seat.toString());
            
            // Hủy các ghế đã chọn
            const updatedSeats = await updateSeatsStatusCanceled(movieScheduleRelationshipId,selectedSeats);
            if (!updatedSeats) {
                return res.status(500).json({
                    message: "Cập nhật trạng thái ghế không thành công",
                });
            }

            // Xóa đặt vé
            await Booking.findByIdAndDelete(booking._id);

            console.log(`Đặt vé có ID ${booking._id} đã được tự động xóa.`);
        }

        console.log("Quá trình tự động xóa đặt vé đã hoàn thành.");
    } catch (error) {
        console.error("Lỗi trong quá trình tự động xóa đặt vé:", error);
    }
};
  // Hàm chạy một lần khi server bắt đầu
  const runOnServerStart = async () => {
    console.log("Server bắt đầu. Chạy hàm cập nhật xoa ve pending qua 1 ngay lần đầu tiên.");
    await autoDeletePendingBookings();
  };
 
  // Chạy hàm cập nhật khi server bắt đầu
  runOnServerStart();
  
// Gọi hàm tự động xóa hàng ngày (ví dụ: mỗi ngày lúc 3 giờ sáng)
schedule.scheduleJob('0 3 * * *', autoDeletePendingBookings);
