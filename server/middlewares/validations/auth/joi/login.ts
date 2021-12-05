import Joi from "joi";
import regExp from "../../../../config/regExp";

export const joiLoginValidation = Joi.object({
    email: Joi.string().required().regex(regExp.email),
    password: Joi.string().required().regex(regExp.password)
})
