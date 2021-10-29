import {Request, NextFunction, Response} from "express";
import moment from 'moment'
import CourtsConfigModel from "../models/courts_config.model";
import {User} from "../documents/User";




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


//middleware for date validation
export async function dateMiddleware(req: Request, res: Response, next: NextFunction) {

}

export async function getCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  const courtType = req.params.courtType
  const court = await CourtsConfigModel.findOne({courtType: courtType})

  //Check if court with such name exists
  if (!court)
    return res.status(400).json({msg: 'Court does not exist'})


  return next()
}


export async function postCourtsMiddleware(req: Request, res: Response, next: NextFunction) {
  const courtType = req.params.courtType
  const courtId = req.params.courtId
  const date = req.params.date


  /*  const courtType = req.body.courtType
    const courtId = req.body.courtId
    // const date = req.body.date

    const court = await CourtsTimeConfigModel.findOne({courtType: courtType, courtId: {$elemMatch: courtId}})

    if (!courtTypes.includes(courtType))
      return res.status(400).json({msg: 'Wrong court type'})

    if (!courtIds.includes(courtId))
      return res.status(400).json({msg: 'Wrong court id'})*/


  return next()
}


export async function putCourtsMiddleware(req: Request, res: Response, next: NextFunction) {

  return next()
}


export async function deleteCourtsMiddleware(req: Request, res: Response, next: NextFunction) {

  return next()
}
