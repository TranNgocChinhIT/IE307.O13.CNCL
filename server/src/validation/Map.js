import Joi from "joi";

const mapValidator = Joi.object({
  cinema_name: Joi.string().required().messages({
    "string.empty": "Tên rạp chiếu phim không được để trống",
    "any.required": "Tên rạp chiếu phim là bắt buộc",
  }),
  location_name: Joi.string().required().messages({
    "string.empty": "Tên địa điểm không được để trống",
    "any.required": "Tên địa điểm là bắt buộc",
  }),
  latitude: Joi.number().required().messages({
    "number.base": "Vĩ độ phải là một số",
    "number.empty": "Vĩ độ không được để trống",
    "any.required": "Vĩ độ là bắt buộc",
  }),
  longitude: Joi.number().required().messages({
    "number.base": "Kinh độ phải là một số",
    "number.empty": "Kinh độ không được để trống",
    "any.required": "Kinh độ là bắt buộc",
  }),
  hasManyAmenities: Joi.boolean().required().messages({
    "boolean.base": "Thông tin tiện ích phải là đúng hoặc sai",
    "any.required": "Thông tin về tiện ích là bắt buộc",
  }),
});

export default mapValidator;
