import Joi from "joi";
import regExp from "../../../../config/regExp";

export const joiEmailValidation = Joi.object({
    email: Joi.string().required().regex(regExp.email)
})
