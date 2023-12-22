import Schedule from "../models/Schedule.js";
import scheduleValidator from "../validation/Schedule.js";

// Lấy danh sách Schedule
export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh sách lịch chiếu",
            });
        }
        return res.status(200).json({
            datas: schedules,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Lấy thông tin một Schedule từ ID
export const getSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({
                message: "Không tìm thấy lịch chiếu",
            });
        }
        return res.status(200).json({
            datas: schedule,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Tạo mới một Schedule
export const createSchedule = async (req, res) => {
    try {
        const { error } = scheduleValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const newSchedule = await Schedule.create(req.body);
        if (!newSchedule) {
            return res.status(400).json({
                message: "Tạo lịch chiếu không thành công",
            });
        }

        return res.status(201).json({
            datas: newSchedule,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Cập nhật một Schedule
export const updateSchedule = async (req, res) => {
    try {
        const { error } = scheduleValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!updatedSchedule) {
            return res.status(404).json({
                message: "Cập nhật không thành công!!",
            });
        }

        return res.status(200).json({
            datas: updatedSchedule,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Xóa một Schedule
export const removeSchedule = async (req, res) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);

        if (!deletedSchedule) {
            return res.status(404).json({
                message: "Xóa không thành công!!",
            });
        }

        return res.status(200).json({
            message: "Xóa lịch chiếu thành công",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
