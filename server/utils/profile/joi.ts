import Joi from "joi";

export const joiUpdateProfile = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    receiveClubEmails: Joi.boolean().required(),
    shareMyEmail: Joi.boolean().required(),
    shareMyPhone: Joi.boolean().required(),
    twitter: Joi.any(),
    instagram: Joi.any(),
    facebook: Joi.any()
})
