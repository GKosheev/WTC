import {Request, Response} from 'express'
import CourtBookingModel from "../models/court_booking.model";
import moment from "moment";
import config from "../config/config";
import {User} from "../documents/User";
import {CourtBooking} from '../interfaces/CourtBooking'

interface CourtStatus {
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


export async function postCourt(req: Request, res: Response) {
  const players = res.locals.players
  const creator = <User>req.user
  // console.log("MEMBERS: " + JSON.stringify(players.members))
  console.log("GUESTS: " + JSON.stringify(players.members))

  let court: CourtBooking = {
    members: players.members,
    guests: players.guests ? players.guests : [],
    courtType: req.params.courtType,
    courtId: Number(req.params.courtId),
    date: req.params.date,
    startTime: req.params.time,
    endTime: moment(req.params.time, config.time_format.momentTimeFormat).add(req.body.duration, 'hour').format(config.time_format.momentTimeFormat),
    createdBy: creator._id
  }
  const newCourtBook = await new CourtBookingModel(court)
  await newCourtBook.save()
  res.status(200).json({msg: 'ok'})
}


export async function deleteCourt(req: Request, res: Response) {

  res.status(200).json({msg: 'ok'})
}


export async function putCourt(req: Request, res: Response) {

  res.status(200).json({msg: 'ok'})
}

