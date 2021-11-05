import Joi from "joi";

export const joiBodyValidation = Joi.object().keys({
  members: Joi.array().items(Joi.string()).required(),
  guests: Joi.array().items(Joi.string()).required(),
  splitPayments: Joi.boolean().required(),
  duration: Joi.number().required().min(1).max(2),
})
