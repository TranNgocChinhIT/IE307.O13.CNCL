import Joi from "joi";

const mapValidator = Joi.object({
  cinema_name: Joi.string().required().messages({
    "string.empty": "Tên rạp chiếu phim không được để trống",
    "any.required": "Tên rạp chiếu phim là bắt buộc",
  }),
  image: Joi.string().allow("").required().messages({
    "any.required": "Hình ảnh là bắt buộc",
  }),
  location: Joi.object({
    type: Joi.string().valid("Point").default("Point"),
    coordinates: Joi.array().items(Joi.number()).length(2).required().messages({
      "array.base": "Tọa độ phải là một mảng",
      "array.length": "Tọa độ phải chứa đúng 2 phần tử",
      "number.base": "Tọa độ phải là số",
      "any.required": "Tọa độ là bắt buộc",
    }),
  }).required(),
  address: Joi.string().required().messages({
    "string.empty": "Địa chỉ không được để trống",
    "any.required": "Địa chỉ là bắt buộc",
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Đánh giá phải là một số",
    "number.min": "Đánh giá tối thiểu là 1",
    "number.max": "Đánh giá tối đa là 5",
    "any.required": "Đánh giá là bắt buộc",
  }),
  hasManyAmenities: Joi.boolean().required().messages({
    "boolean.base": "Thông tin tiện ích phải là đúng hoặc sai",
    "any.required": "Thông tin về tiện ích là bắt buộc",
  }),
});

export default mapValidator;
