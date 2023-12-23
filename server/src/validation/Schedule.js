import Joi from "joi";

const scheduleValidator = Joi.object({
    screeningDate: Joi.date().required().messages({
        "date.base": "Ngày chiếu phải là một ngày hợp lệ",
        "date.empty": "Ngày chiếu không được để trống",
        "any.required": "Ngày chiếu là bắt buộc",
    }),
    screeningTime: Joi.string().required().min(1).max(20).messages({
        "string.empty": "Thời gian chiếu không được để trống",
        "any.required": "Thời gian chiếu là bắt buộc",
        "string.min": "Thời gian chiếu phải có ít nhất {#limit} ký tự",
        "string.max": "Thời gian chiếu phải có ít hơn {#limit + 1} ký tự",
    }),
    theater: Joi.string().required().min(1).max(50).messages({
        "string.empty": "Tên rạp không được để trống",
        "any.required": "Tên rạp là bắt buộc",
        "string.min": "Tên rạp phải có ít nhất {#limit} ký tự",
        "string.max": "Tên rạp phải có ít hơn {#limit + 1} ký tự",
    }),
    ticketPrice: Joi.number().required().min(0).messages({
        "number.base": "Giá vé phải là một số",
        "number.empty": "Giá vé không được để trống",
        "number.min": "Giá vé không được nhỏ hơn {#limit}",
        "any.required": "Giá vé là bắt buộc",
    }),
});

export default scheduleValidator;
