import {Request, NextFunction, Response} from "express";
import moment from 'moment'
import CourtsConfigModel from "../../models/courts_config.model";
import config from '../../config/config'
import {courtIdVal, courtParamsTypeVal, courtTimeVal, courtTypeVal} from "./validation.functions";
import Joi from "joi";


export async function courtDateValidation(date: string) {
  return (req: Request, res: Response, next: NextFunction) => {

    //Check if date format is the same as defined
    if (!moment(date, config.time_format.momentDateISOFormat, true).isValid())
      return res.status(400).json({msg: 'Wrong data format'})

    const currentTime = moment(moment.now()).format(config.time_format.momentDateISOFormat) //defined current time with ISO format
    const afterTimeLimit = moment(currentTime).add(7, 'days').format(config.time_format.momentDateISOFormat) //max reachable time for members
    //Deny the permission to load courts if user tries to load them 1 day before current time or 7+ days ahead
    if (moment(date).isBefore(currentTime) || moment(date).isAfter(afterTimeLimit))
      return res.status(400).json({msg: 'Permission denied'})

    return next()
  }
}

const joiCourtTypeValidation = Joi.object().keys({
  courtType: Joi.string().required()
})

export async function courtTypeValidation(courtType: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const courtValidation = await joiCourtTypeValidation.validate({courtType: courtType})
    if (courtValidation.error)
      return res.status(400).json({msg: 'Court Type Validation Error'})

    const court = await CourtsConfigModel.findOne({courtType: courtType})
    //checks if court with entered courtType doesn't exist
    if (!court)
      return res.status(400).json({msg: 'Court does not exist'})

    return next()
  }
}

// Only for :/courtType, /:courtId, /:date and /:time at the same time
export async function courtParamsValidation() {
  return async (req: Request, res: Response, next: NextFunction) => {
    await courtParamsTypeVal(req.params.courtType, req.params.courtId, req.params.date, req.params.time) //Validating type of params

    const court = await CourtsConfigModel.findOne({courtType: req.params.courtType})
    const courtId = Number(req.params.courtId) // Converting String to Number
    const date = req.params.date;
    const time = req.params.time;

    await courtTypeVal(court)
    await courtIdVal(court, courtId)
    await courtDateValidation(date)
    await courtTimeVal(court, courtId, time)

    return next()
  }
}

