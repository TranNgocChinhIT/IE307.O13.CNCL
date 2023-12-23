import Joi from "joi";

const movieValidator = Joi.object({
    title: Joi.string().required().min(3).max(255).messages({
        "string.empty": "Tiêu đề không được để trống",
        "any.required": "Tiêu đề là bắt buộc",
        "string.min": "Tiêu đề phải có ít nhất {#limit} ký tự",
        "string.max": "Tiêu đề phải có ít hơn {#limit + 1} ký tự",
    }),
    imagePath: Joi.string().required().uri().messages({
        "string.empty": "Đường dẫn hình ảnh không được để trống",
        "any.required": "Đường dẫn hình ảnh là bắt buộc",
        "string.uri": "Đường dẫn hình ảnh không hợp lệ",
    }),
    backdrop_path: Joi.string().required().uri().messages({
        "string.empty": "Đường dẫn backdrop không được để trống",
        "any.required": "Đường dẫn backdrop là bắt buộc",
        "string.uri": "Đường dẫn backdrop không hợp lệ",
    }),
    evaluate: Joi.number().min(0).max(10).required().messages({
        "number.base": "Đánh giá phải là một số",
        "number.empty": "Đánh giá không được để trống",
        "number.min": "Đánh giá không được nhỏ hơn {#limit}",
        "number.max": "Đánh giá không được lớn hơn {#limit}",
        "any.required": "Đánh giá là bắt buộc",
    }),
    time: Joi.string().required().min(1).max(20).messages({
        "string.empty": "Thời lượng không được để trống",
        "any.required": "Thời lượng là bắt buộc",
        "string.min": "Thời lượng phải có ít nhất {#limit} ký tự",
        "string.max": "Thời lượng phải có ít hơn {#limit + 1} ký tự",
    }),
    date: Joi.string().required().min(1).max(20).messages({
        "string.empty": "Ngày không được để trống",
        "any.required": "Ngày là bắt buộc",
        "string.min": "Ngày phải có ít nhất {#limit} ký tự",
        "string.max": "Ngày phải có ít hơn {#limit + 1} ký tự",
    }),
    content: Joi.string().required().min(10).max(1000).messages({
        "string.empty": "Nội dung không được để trống",
        "any.required": "Nội dung là bắt buộc",
        "string.min": "Nội dung phải có ít nhất {#limit} ký tự",
        "string.max": "Nội dung phải có ít hơn {#limit + 1} ký tự",
    }),
    genre: Joi.string().required().min(3).max(50).messages({
        "string.empty": "Thể loại không được để trống",
        "any.required": "Thể loại là bắt buộc",
        "string.min": "Thể loại phải có ít nhất {#limit} ký tự",
        "string.max": "Thể loại phải có ít hơn {#limit + 1} ký tự",
    }),
    director: Joi.string().required().min(3).max(100).messages({
        "string.empty": "Đạo diễn không được để trống",
        "any.required": "Đạo diễn là bắt buộc",
        "string.min": "Đạo diễn phải có ít nhất {#limit} ký tự",
        "string.max": "Đạo diễn phải có ít hơn {#limit + 1} ký tự",
    }),
    language: Joi.string().required().min(3).max(50).messages({
        "string.empty": "Ngôn ngữ không được để trống",
        "any.required": "Ngôn ngữ là bắt buộc",
        "string.min": "Ngôn ngữ phải có ít nhất {#limit} ký tự",
        "string.max": "Ngôn ngữ phải có ít hơn {#limit + 1} ký tự",
    }),
    cast: Joi.array().items(Joi.object({
        actorName: Joi.string().required().min(3).max(255),
        actorImage: Joi.string().required().uri(),
    })).required().messages({
        "array.base": "Dàn diễn viên phải là một mảng",
        "array.empty": "Dàn diễn viên không được để trống",
        "any.required": "Dàn diễn viên là bắt buộc",
    }),
    trailer: Joi.string().required().uri().messages({
        "string.empty": "Đường dẫn trailer không được để trống",
        "any.required": "Đường dẫn trailer là bắt buộc",
        "string.uri": "Đường dẫn trailer không hợp lệ",
    }),
    categoryID: Joi.string().allow('').messages({
        "string.empty": "CategoryID không được để trống",
        "any.required": "CategoryID là bắt buộc",
    }),
});

export default movieValidator;
