import Joi from "joi";
import regExp from "../../../../config/regExp";

export const joiResetPassword = Joi.object({
    token: Joi.string().min(40).max(40).required(),
    password: Joi.string().required().regex(regExp.password)
})
