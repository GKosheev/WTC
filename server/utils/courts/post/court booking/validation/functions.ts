import moment from "moment";
import config from "../../../../../config/config";
import CourtBookingModel from "../../../../../models/courts/court-booking.model";
import {durationTypeValidation} from "../../body/functions";

function momentAddHoursToCustomTime(hours: number, time: string) {
  return moment(time, config.time_format.momentTimeCustomFormat).add(hours, 'hour').format(config.time_format.momentTimeCustomFormat)
}

async function startTimeIntervals(time: string, duration: number) {
  //start time intervals
  const stIntervals: string[] = []
  switch (duration) {
    case 1:
      stIntervals.push(momentAddHoursToCustomTime(0.5, time))
      break;
    case 1.5:
      stIntervals.push(momentAddHoursToCustomTime(0.5, time))
      stIntervals.push(momentAddHoursToCustomTime(1, time))
      break;
    case 2:
      stIntervals.push(momentAddHoursToCustomTime(0.5, time))
      stIntervals.push(momentAddHoursToCustomTime(1, time))
      stIntervals.push(momentAddHoursToCustomTime(1.5, time))
      break
  }
  return stIntervals
}

async function endTimeIntervals(time: string) {
  //end time intervals
  const etIntervals: string[] = []
  etIntervals.push(momentAddHoursToCustomTime(0.5, time))
  etIntervals.push(momentAddHoursToCustomTime(1, time))
  etIntervals.push(momentAddHoursToCustomTime(1.5, time))
  return etIntervals
}


export async function durationValidation(courtType: string, courtId: number, date: string, time: string, duration: number) {

  const durationTypeError = await durationTypeValidation(duration)
  if (durationTypeError)
    return durationTypeError


  //all start time intervals to check
  const stIntervals = await startTimeIntervals(time, duration)
  const stCourts = await CourtBookingModel.countDocuments({
    courtType: courtType,
    courtId: courtId,
    date: date,
    startTime: {$in: stIntervals}
  })
  if (stCourts)
    return `Found ${stCourts} booked court(s) after ${time}, during ${duration}h`

  //all end time intervals to check
  const etIntervals = await endTimeIntervals(time)
  const etCourts = await CourtBookingModel.countDocuments({
    courtType: courtType,
    courtId: courtId,
    date: date,
    endTime: {$in: etIntervals}
  })
  if (etCourts)
    return `Found ${etCourts} booked court(s) before ${time}, during ${duration}h`
}
