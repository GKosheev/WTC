import Joi from "joi";

export const joiMessageToUserValidation = Joi.object({
  subject: Joi.string().required().min(1).max(25),
  text: Joi.string().required().min(1)
})
