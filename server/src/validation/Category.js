import Joi from "joi";

const categoryValidator = Joi.object({
    title: Joi.string().required().min(3).max(255).messages({
        "string.empty": "Tiêu đề không được để trống",
        "any.required": "Tiêu đề là bắt buộc",
        "string.min": "Tiêu đề phải có ít nhất {#limit} ký tự",
        "string.max": "Tiêu đề phải có ít hơn {#limit + 1} ký tự",
    }),
    slug: Joi.string().required().messages({
        "string.empty": "Slug không được để trống",
        "any.required": "Slug là bắt buộc",
    }),
    movies: Joi.array().items(Joi.string()).messages({
        "array.base": "Movies phải là một mảng",
        "array.includes": "Movies phải chứa các giá trị số nguyên",
    }),
});

export default categoryValidator;
