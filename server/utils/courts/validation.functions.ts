import Joi from "joi";
import {CourtsConfig} from "../../documents/CourtsConfig";
import {NextFunction, Request, Response} from "express";
import moment from "moment";
import config from "../../config/config";

const joiParamsValidation = Joi.object().keys({
  courtType: Joi.string().required(),
  courtId: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required()
})

/*
  Court Type Validation
*/
export async function courtTypeVal(court: CourtsConfig | null) {
  return async (req: Request, res: Response, next: NextFunction) => {
    //checks if court with entered courtType doesn't exist
    if (!court)
      return res.status(400).json({msg: 'Court does not exist'})

    return next()
  }
}

/*
  Court Id Validation
  court: CourtsConfig -> Found Court With Entered CourtType
 */
export async function courtIdVal(court: CourtsConfig | null, courtId: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    //checks if court with entered id doesn't exist
    if (!court!.courts.some(court => court.courtId === courtId))
      return res.status(400).json({msg: 'Court with such id does not exist'})

    return next()
  }
}

/*
  Court Time Validation
 */
export async function courtTimeVal(court: CourtsConfig | null, courtId: number, time: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    //checks if entered time has the same format as defined
    if (!moment(time, config.time_format.momentTimeFormat, true).isValid())
      return res.status(400).json({msg: 'Wrong time format'})

    let found_court = court!.courts.find(court => court.courtId === courtId)
    if (!found_court!.time.includes(time))
      return res.status(400).json({msg: 'Entered time does not exist'})


    return next()
  }
}

export async function courtParamsTypeVal(courtType: string, courtId: string, date: string, time: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const courtValidation = await joiParamsValidation.validate({
      courtType: courtType,
      courtId: courtId,
      date: date,
      time: time
    })

    if (courtValidation.error)
      return res.status(400).json({msg: 'Validation error'})

    if (isNaN(Number(courtId)))
      return res.status(400).json({msg: 'Wrong court id'})

    return next()
  }
}
