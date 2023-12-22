import Joi from "joi";

const bookingValidator = Joi.object({
  user: Joi.string().required().messages({
    "string.empty": "Người dùng không được để trống",
    "any.required": "Người dùng là bắt buộc",
  }),
  movieScheduleRelationship: Joi.string().required().messages({
    "string.empty": "Mối quan hệ không được để trống",
    "any.required": "Mối quan hệ lịch chiếu là bắt buộc",
  }),
  numberOfTickets: Joi.number().required().min(1).messages({
    "number.base": "Số lượng vé phải là một số",
    "number.empty": "Số lượng vé không được để trống",
    "number.min": "Số lượng vé phải lớn hơn hoặc bằng 1",
    "any.required": "Số lượng vé là bắt buộc",
  }),
  totalAmount: Joi.number().required().messages({
    "number.base": "Tổng giá vé phải là một số",
    "number.empty": "Tổng giá vé không được để trống",
    "any.required": "Tổng giá vé là bắt buộc",
  }),
  paymentStatus: Joi.string()
    .valid("pending", "completed", "canceled")
    .default("pending")
    .required()
    .messages({
      "string.empty": "Trạng thái thanh toán không được để trống",
      "any.required": "Trạng thái thanh toán là bắt buộc",
      "any.only": "Trạng thái thanh toán không hợp lệ",
    }),
});

export default bookingValidator;
