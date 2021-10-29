import {Request, Response, NextFunction} from 'express'
import moment from 'moment-timezone';
import CourtBookingModel from "../models/court_booking.model";

interface CourtStatus{
  _id: String,
  courtId: Number,
  startTime: String,
  endTime: String
}

export async function getCourts(req: Request, res: Response) {
  const courtType = req.params.courtType
  const date = req.params.date
  const courts_ = await CourtBookingModel.find({courtType: courtType, date: date})

  let courts: CourtStatus[] = []
  await courts_.forEach((court) => {
    courts.push({
      _id: court._id,
      courtId: court.courtId,
      startTime: court.startTime,
      endTime: court.endTime
    })
  })
  return res.status(200).send(courts)
}
