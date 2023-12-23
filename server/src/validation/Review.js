import Joi from "joi";

const reviewValidator = Joi.object({
  user: Joi.string().required().messages({
    "any.required": "Mã người dùng là bắt buộc",
  }),
  movie: Joi.string().required().messages({
    "any.required": "Mã phim là bắt buộc",
  }),
  rating: Joi.number().required().integer().min(0).max(10).messages({
    "number.base": "Đánh giá phải là một số",
    "number.empty": "Đánh giá không được để trống",
    "number.integer": "Đánh giá phải là số nguyên",
    "number.min": "Đánh giá không được nhỏ hơn 0",
    "number.max": "Đánh giá không được lớn hơn 10",
    "any.required": "Đánh giá là bắt buộc",
  }),
  comment: Joi.string().required().min(3).max(500).messages({
    "string.empty": "Bình luận không được để trống",
    "any.required": "Bình luận là bắt buộc",
    "string.min": "Bình luận phải có ít nhất {#limit} ký tự",
    "string.max": "Bình luận phải có ít hơn {#limit + 1} ký tự",
  }),
});

export default reviewValidator;
