import {Request, NextFunction, Response} from "express";
import {User} from "../documents/User";
import {
  courtTypeValidation,
  courtDateValidation,
  courtParamsValidation, validateAndReturnParams
} from "../utils/courts/params validation/validation";
import {postCourtsBodyValidation, validateAndReturnBody} from "../utils/courts/body validation/validation";
import CourtBookingModel from "../models/court_booking.model";
import {joiParamsValidation} from "../utils/courts/params validation/joi-validation";
import {bookingCourtValidation} from "../utils/courts/booking court validation/validation";


export async function subscriptionMiddleware(req: Request, res: Response, next: NextFunction) {
  const date = req.params.date
  const user = <User>req.user
  const userId = user._id
  /*
  const currentTime = moment(moment.now()).format(momentFormat)
  const subscription = SubscriptionModel.findOne({_id: userId})
    if (!subscription)
      res.status(400).json({msg: 'User subscription does not exist'})
      const subEndDate = moment(subscription.EndDate, momentCustomFormat).format(momentFormat)
      if (moment(subEndDate).isBefore(currentTime)
    */
}


export async function getCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  const dateError = await courtDateValidation(req.params.date)
  if (dateError)
    return res.status(400).json({msg: dateError})

  const courtTypeError = await courtTypeValidation(req.params.courtType)
  if (courtTypeError)
    return res.status(400).json({msg: courtTypeError})

  return next()
}


export async function postCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  /*Start Of Params Validation*/
  const [params, paramsTypeError] = await validateAndReturnParams(req.params.courtType, req.params.courtId, req.params.date, req.params.time)
  if (paramsTypeError)
    return res.status(400).json({msg: paramsTypeError})
  if (!params)
    return res.status(400).json({msg: 'Unexpected error: null params'})
  const [courtType, courtId, date, time] = params
  const paramsError = await courtParamsValidation(courtType, courtId, date, time)
  if (paramsError)
    return res.status(400).json({msg: paramsError})
  /*End Of Params Validation*/


  const courtBooked = await CourtBookingModel.findOne({
    courtType: courtType,
    courtId: courtId,
    date: date,
    startTime: time
  })
  if (courtBooked)
    return res.status(400).json({msg: 'Current time is already booked'})


  /*Body Type Validation*/
  const [body, bodyTypeError] = await validateAndReturnBody(req.body.members, req.body.guests, req.body.splitPayments, req.body.duration)
  if (bodyTypeError)
    return res.status(400).json({msg: bodyTypeError})
  if (!body)
    return res.status(400).json({msg: 'Unexpected error: null body'})
  const [members, guests, splitPayments, duration] = body

  /*Body Validation*/
  const [players, bodyError] = await postCourtsBodyValidation(members, guests, duration)
  if (bodyError)
    return res.status(400).json({msg: bodyError})

  /*Court Booking Validation*/
  const bookingValidationError = await bookingCourtValidation(courtType, courtId, date, time, duration)
  if (bookingValidationError)
    return res.status(400).json({msg: bookingValidationError})


  res.locals.players = players
  return next()
}


export async function putCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  /*  const paramsError = await courtParamsValidation(req.params.courtType, req.params.courtId, req.params.date, req.params.time)
    if (paramsError)
      return res.status(400).json({msg: paramsError})*/
  return next()
}


export async function deleteCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  /*  const paramsError = await courtParamsValidation(req.params.courtType, req.params.courtId, req.params.date, req.params.time)
    if (paramsError)
      return res.status(400).json({msg: paramsError})*/
  return next()
}
