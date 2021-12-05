import Joi from "joi";
import regExp from "../../../../config/regExp";

const Profile = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().regex(regExp.email),
    phone: Joi.string().required(),
    gender: Joi.required(),
    dateOfBirth: Joi.date().required(),
    receiveClubEmails: Joi.bool().required()
})


const Private = Joi.object().keys({
    secureQuestion: Joi.string().required(),
    secureAnswer: Joi.string().required(),
    password: Joi.string().required().regex(regExp.password),
    repeatPassword: Joi.string().required().valid(Joi.ref('password')),
})

const Agreements = Joi.object().keys({
    privacyPolicy: Joi.string().required(),
    covidPolicy: Joi.string().required(),
    clubPolicy: Joi.string().required(),
})

export const joiUserRegister = Joi.object({
    profile: Profile,
    agreements: Agreements,
    private: Private
})
