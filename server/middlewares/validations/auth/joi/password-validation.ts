import Joi from "joi";
import regExp from "../../../../config/regExp";

export const joiPasswordValidation = Joi.object({
    password: Joi.string().required().regex(regExp.password)
})
