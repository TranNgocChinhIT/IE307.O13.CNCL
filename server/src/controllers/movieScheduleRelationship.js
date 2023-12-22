import MovieScheduleRelationship from "../models/movieScheduleRelationship.js";
import Movie from "../models/Movie.js";
import Schedule from "../models/Schedule.js";
import movieScheduleRelationshipValidator from "../validation/movieScheduleRelationship.js";

// Lấy danh sách MovieScheduleRelationship
export const getAllMovieScheduleRelationships = async (req, res) => {
    try {
        const movieScheduleRelationships = await MovieScheduleRelationship.find().populate('movie schedule');
        if (!movieScheduleRelationships || movieScheduleRelationships.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh sách quan hệ movie và lịch chiếu",
            });
        }
        return res.status(200).json({
            datas: movieScheduleRelationships,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Lấy thông tin một MovieScheduleRelationship từ ID
export const getMovieScheduleRelationship = async (req, res) => {
    try {
        const movieScheduleRelationship = await MovieScheduleRelationship.findById(req.params.id).populate('movie schedule');
        if (!movieScheduleRelationship) {
            return res.status(404).json({
                message: "Không tìm thấy quan hệ movie và lịch chiếu",
            });
        }
        return res.status(200).json({
            datas: movieScheduleRelationship,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Tạo mới một MovieScheduleRelationship
export const createMovieScheduleRelationship = async (req, res) => {
    try {
        const { error } = movieScheduleRelationshipValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const { movie, schedule, seats } = req.body;

        // Kiểm tra xem movie và schedule có tồn tại không
        const existingMovie = await Movie.findById(movie);
        const existingSchedule = await Schedule.findById(schedule);

        if (!existingMovie || !existingSchedule) {
            return res.status(404).json({
                message: "Movie hoặc Schedule không tồn tại",
            });
        }

        const newMovieScheduleRelationship = await MovieScheduleRelationship.create({
            movie,
            schedule,
            seats,
        });

        if (!newMovieScheduleRelationship) {
            return res.status(400).json({
                message: "Tạo quan hệ movie và lịch chiếu không thành công",
            });
        }

        return res.status(201).json({
            datas: newMovieScheduleRelationship,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Cập nhật một MovieScheduleRelationship
export const updateMovieScheduleRelationship = async (req, res) => {
    try {
        const { error } = movieScheduleRelationshipValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Lấy thông tin cũ của MovieScheduleRelationship
        const oldMovieScheduleRelationship = await MovieScheduleRelationship.findById(req.params.id);

        if (!oldMovieScheduleRelationship) {
            return res.status(404).json({
                message: "Không tìm thấy quan hệ movie và lịch chiếu",
            });
        }
        // Kiểm tra và thực hiện chuyển đổi selected và taken
        if (req.body.seats && req.body.seats.length > 0) {
            req.body.seats.forEach((row, rowIndex) => {
                row.forEach((seat, seatIndex) => {
                    if (seat.selected !== seat.taken) {
                        // Chuyển đổi selected thành false chỉ khi selected khác taken
                        req.body.seats[rowIndex][seatIndex].selected = false;
                    }
                });
            });
        }
        const updatedMovieScheduleRelationship = await MovieScheduleRelationship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!updatedMovieScheduleRelationship) {
            return res.status(404).json({
                message: "Cập nhật không thành công!!",
            });
        }

        return res.status(200).json({
            datas: updatedMovieScheduleRelationship,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Xóa một MovieScheduleRelationship
export const removeMovieScheduleRelationship = async (req, res) => {
    try {
        const deletedMovieScheduleRelationship = await MovieScheduleRelationship.findByIdAndDelete(req.params.id);

        if (!deletedMovieScheduleRelationship) {
            return res.status(404).json({
                message: "Xóa không thành công!!",
            });
        }

        return res.status(200).json({
            message: "Xóa quan hệ movie và lịch chiếu thành công",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
