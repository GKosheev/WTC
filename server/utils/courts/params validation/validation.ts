import moment from 'moment'
import CourtsConfigModel from "../../../models/courts_config.model";
import config from '../../../config/config'
import {courtIdVal, courtParamsTypeVal, courtTimeVal, courtTypeVal} from "./validation.functions";
import {joiCourtTypeValidation} from "./joi.validation";


export async function courtDateValidation(date: string) {
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
  const courtValidation = await joiCourtTypeValidation.validate({courtType: courtType})
  if (courtValidation.error)
    return 'Court Type Validation Error'

  const court = await CourtsConfigModel.findOne({courtType: courtType})
  if (!court)
    return 'Court does not exist'
}

export async function courtParamsValidation(courtType: string, courtId_: string, date: string, time: string) {
  const courtParamsError = await courtParamsTypeVal(courtType, courtId_, date, time) //Validating type of params
  if (courtParamsError)
    return courtParamsError
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

