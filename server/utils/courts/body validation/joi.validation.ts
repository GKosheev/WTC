import Joi from "joi";

export const joiDurationValidation = Joi.object().keys({
  duration: Joi.number().required().min(1).max(2)
})
