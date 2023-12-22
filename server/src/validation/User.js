import Joi from "joi";

const signUpValidator = Joi.object ({
    userName: Joi.string().required().min(6).max(255).messages({
        "string.empty": "username không được để trống" ,
        "any.required": "username la bat buoc",
        "string.min":"username phai co it nhat {#limit} ky tu",
        "string.max":"username phai co it hon {#limit + 1} ky tu",
    }),
    phone: Joi.string().required().pattern(/^(03|05|07|08|09)\d{8}$/).messages({
        "string.empty": "Số điện thoại không được để trống",
        "any.required": "Số điện thoại là bắt buộc",
        "string.pattern.base": "Số điện thoại không hợp lệ",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "email không được để trống" ,
        "any.required": "email la bat buoc",
        "string.email": "email khong dung dinh dang"
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password không được để trống" ,
        "any.required": "password la bat buoc",
        "string.min":"password phai co it nhat {#limit} ky tu",
        "string.max":"password phai co it hon {#limit + 1} ky tu",
    }),
    confirmPassword: Joi.string().required().min(6).max(255).valid(Joi.ref("password")).messages({
        "string.empty": "confirmpassword không được để trống" ,
        "any.required": "confirmpassword la bat buoc",
        "string.min":"confirmpassword phai co it nhat {#limit} ky tu",
        "string.max":"confirmpassword phai co it hon {#limit + 1} ky tu",
        "any.only": "confirmpassword khong khop",
    }),
    region: Joi.string().required().min(3).max(255).messages({
        "string.empty": "adress không được để trống" ,
        "any.required": "adress la bat buoc",
        "string.min":"adress phai co it nhat {#limit} ky tu",
        "string.max":"adress phai co it hon {#limit + 1} ky tu",
    }),
    role: Joi.string()
})
const signInValidator = Joi.object ({
    email: Joi.string().required().email().messages({
        "string.empty": "email không được để trống" ,
        "any.required": "email la bat buoc",
        "string.email": "email khong dung dinh dang"
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password không được để trống" ,
        "any.required": "password la bat buoc",
        "string.min":"password phai co it nhat {#limit} ky tu",
        "string.max":"password phai co it hon {#limit + 1} ky tu",
    }),

})
const userValidator = Joi.object ({
    userName: Joi.string().required().min(6).max(255).messages({
        "string.empty": "username không được để trống" ,
        "any.required": "username la bat buoc",
        "string.min":"username phai co it nhat {#limit} ky tu",
        "string.max":"username phai co it hon {#limit + 1} ky tu",
    }),
    phone: Joi.string().required().pattern(/^(03|05|07|08|09)\d{8}$/).messages({
        "string.empty": "Số điện thoại không được để trống",
        "any.required": "Số điện thoại là bắt buộc",
        "string.pattern.base": "Số điện thoại không hợp lệ",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "email không được để trống" ,
        "any.required": "email la bat buoc",
        "string.email": "email khong dung dinh dang"
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password không được để trống" ,
        "any.required": "password la bat buoc",
        "string.min":"password phai co it nhat {#limit} ky tu",
        "string.max":"password phai co it hon {#limit + 1} ky tu",
    }),
    region: Joi.string().required().min(3).max(255).messages({
        "string.empty": "adress không được để trống" ,
        "any.required": "adress la bat buoc",
        "string.min":"adress phai co it nhat {#limit} ky tu",
        "string.max":"adress phai co it hon {#limit + 1} ky tu",
    }),
    role: Joi.string()
})
export {signUpValidator,signInValidator,userValidator};