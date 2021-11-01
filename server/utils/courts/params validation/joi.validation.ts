import Joi from "joi";

export const joiParamsValidation = Joi.object().keys({
  courtType: Joi.string().required(),
  courtId: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required()
})
export const joiCourtTypeValidation = Joi.object().keys({
  courtType: Joi.string().required()
})
