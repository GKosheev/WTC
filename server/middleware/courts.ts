import {Request, NextFunction, Response} from "express";
import moment from 'moment'
import CourtsConfigModel from "../models/courts_config.model";
import {User} from "../documents/User";
import {courtTypeValidation, courtDateValidation, courtParamsValidation} from "../utils/courts/validation";


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
  await courtDateValidation(req.params.date)
  await courtTypeValidation(req.params.courtType)

  return next()
}


export async function postCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  await courtParamsValidation()
  return next()
}


export async function putCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  await courtParamsValidation()
  return next()
}


export async function deleteCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  await courtParamsValidation()
  return next()
}
