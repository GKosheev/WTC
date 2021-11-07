import Joi from "joi";

export const joiParamsValidation = Joi.object().keys({
  courtType: Joi.string().required(),
  courtId: Joi.number().required(),
  date: Joi.string().required(),
  time: Joi.string().required()
})
