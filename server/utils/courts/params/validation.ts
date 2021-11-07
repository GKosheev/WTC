import moment from 'moment'
import CourtsConfigModel from "../../../models/courts/courts-config.model";
import config from '../../../config/config'
import {courtIdVal, courtTimeVal, courtTypeVal} from "./functions";
import {joiParamsValidation} from "./joi";


export async function courtDateValidation(date: string) { // (date: string, role: string) role for permission to check courts
  //Check if date format is the same as defined
  if (!moment(date, config.time_format.momentDateISOFormat, true).isValid())
    return 'Wrong date format'

  const currentTime = moment(moment.now()).format(config.time_format.momentDateISOFormat) //defined current time with ISO format
  const afterTimeLimit = moment(currentTime).add(7, 'days').format(config.time_format.momentDateISOFormat) //max reachable time for members
  //Deny the permission to load courts if user tries to load them 1 day before current time or 7+ days ahead
  if (moment(date).isBefore(currentTime) || moment(date).isAfter(afterTimeLimit))
    return 'Permission denied'
}


export async function courtTypeValidation(courtType: string) {
  const court = await CourtsConfigModel.findOne({courtType: courtType})
  if (!court)
    return 'Court does not exist'
}

export async function courtParamsValidation(courtType: string, courtId_: number, date: string, time: string) {
  const court = await CourtsConfigModel.findOne({courtType: courtType})
  const courtId = Number(courtId_) // Converting String to Number

  const courtTypeError = await courtTypeVal(court)
  if (courtTypeError)
    return courtTypeError

  const courtIdError = await courtIdVal(court, courtId)
  if (courtIdError)
    return courtIdError

  const courtDateError = await courtDateValidation(date)
  if (courtDateError)
    return courtDateError

  const courtTimeError = await courtTimeVal(court, courtId, time)
  if (courtTimeError)
    return courtTimeError
}

export async function validateAndReturnParams(courtType: any, courtId: any, date: any, time: any): Promise<[[string, number, string, string], null] | [null, string]> {
  const {value, error} = await joiParamsValidation.validate({
    courtType: courtType,
    courtId: courtId,
    date: date,
    time: time
  })
  if (error)
    return [null, `Params error: ${error}`]

  return [[value.courtType, value.courtId, value.date, value.time], null]
}

