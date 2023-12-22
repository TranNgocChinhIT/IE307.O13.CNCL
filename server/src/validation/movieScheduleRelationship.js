import Joi from "joi";

const movieScheduleRelationshipValidator = Joi.object({
    movie: Joi.string().required().messages({
        "string.empty": "ID phim không được để trống",
        "any.required": "ID phim là bắt buộc",
    }),
    schedule: Joi.string().required().messages({
        "string.empty": "ID lịch chiếu không được để trống",
        "any.required": "ID lịch chiếu là bắt buộc",
    }),
    seats: Joi.array().required().items(
        Joi.array().items(Joi.object({
            number: Joi.string().required().messages({
                "string.empty": "Số ghế không được để trống",
                "any.required": "Số ghế là bắt buộc",
            }),
            taken: Joi.boolean().required().messages({
                "boolean.base": "Trạng thái ghế không hợp lệ",
                "any.required": "Trạng thái ghế là bắt buộc",
            }),
            selected: Joi.boolean().required().messages({
                "boolean.base": "Trạng thái ghế không hợp lệ",
                "any.required": "Trạng thái ghế là bắt buộc",
            }),
        }))
    ).required().messages({
        "array.empty": "Danh sách ghế không được để trống",
        "any.required": "Danh sách ghế là bắt buộc",
    }),
});

export default movieScheduleRelationshipValidator;
