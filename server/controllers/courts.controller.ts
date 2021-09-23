import {Request, Response, NextFunction} from 'express'
import moment from 'moment-timezone';


module.exports.getCourt = async function (req: Request, res: Response) {
  const courtType = req.body.courtType
  const courtId = req.body.courtId
  const date = req.body.date
  const time = req.body.time

  if (moment(date).isBefore(moment.now()) || moment(date).isAfter(moment(moment().add(8, 'days'))))
    res.status(400).json({msg: 'wrong date'}) // if user wants to check booked courts before current date
                                                          // or after more than  8 days
  if (courtType === 'indoor') {

  } else if (courtType === 'outdoor') {

  } else if (courtType === 'wall') {

  } else
    return res.status(400).json({msg: 'wrong court type'})


}
