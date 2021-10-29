import {Request, NextFunction, Response} from "express";
import moment from 'moment'
import CourtsConfigModel from "../../models/courts_config.model";

const momentISOFormat = 'YYYY-MM-DD'
const momentCustomFormat = 'MM-DD-YYYY'
const momentTimeFormat = 'hh:mm a'

export async function dateValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date

    //Check if date format is the same as defined
    if (!moment(date, momentISOFormat, true).isValid())
      return res.status(400).json({msg: 'Wrong data format'})

    const currentTime = moment(moment.now()).format(momentISOFormat) //defined current time with ISO format
    const afterTimeLimit = moment(currentTime).add(7, 'days').format(momentISOFormat) //max reachable time for members
    //Deny the permission to load courts if user tries to load them 1 day before current time or 7+ days ahead
    if (moment(date).isBefore(currentTime) || moment(date).isAfter(afterTimeLimit))
      return res.status(400).json({msg: 'Permission denied'})

    return next()
  }
}

export async function timeValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    const time = req.params.time

    if (!moment(time, momentTimeFormat, true).isValid())
      return res.status(400).json({msg: 'Wrong time format'})

    return next()
  }
}


export async function courtTypeValidation() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const courtType = req.params.courtType;
    const court = await CourtsConfigModel.findOne({courtType: courtType})

    //Check if court with such name exists
    if (!court)
      return res.status(400).json({msg: 'Court does not exist'})

    return next()
  }
}

export async function courtIdAndCourtTypeValidation() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const courtId = req.params.courtId
    const courtType = req.params.courtType;
    const court = await CourtsConfigModel.findOne({courtType: courtType})
    //search if courtId exists inside court.courts
    return next()
  }
}

