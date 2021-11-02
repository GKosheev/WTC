import {User} from "../../../documents/User";
import UserModel from "../../../models/user.model";
import config from "../../../config/config";
import {joiDurationValidation} from "./joi.validation";
import moment from "moment";
import CourtBookingModel from "../../../models/court_booking.model";
import CourtsConfigModel from "../../../models/courts_config.model";

export async function membersValidation(membersID: string[]) {
  if (!(membersID.length > 0))
    return [null, null]

  let members: User[] = []
  for await (let memberID of membersID) {
    const user = await UserModel.findOne({'profile.memberID': memberID})
    if (!user)
      return [null, `Member with id '${memberID}' does not exist`]

    if (user.roles.includes(config.roles.nonMember))
      return [null, `User '${user.profile.firstName + ' ' + user.profile.lastName}' doesn't have a subscription`]
    members.push(user)
  }
  return [members, null] //all found members
}

export async function guestsValidation(guestsID: string[]) {
  if (!(guestsID.length > 0))
    return [null, null];

  let guests: User[] = []
  for await (let guestID of guestsID) {
    const user = await UserModel.findOne({'profile.memberID': guestID})
    if (!user)
      return [null, `Guest with id '${guestID}' doesn't exist`]

    if (!user.roles.includes(config.roles.nonMember))
      return [null, `User ${user.profile.firstName + ' ' + user.profile.lastName} can't be put in a guest list`]
    guests.push(user)
  }
  return [guests, null] // all found guests
}

async function durationTypeValidation(duration: number) {
  const durationValidation = await joiDurationValidation.validate({duration: duration})
  if (durationValidation.error)
    return durationValidation.error.message

  if (duration % 0.5 !== 0)
    return 'Time Validation Error' //that allows to book a court for 1, 1.5 and 2 hours
}

/*function getISOMaxTimeFromArray(time_array: string[], arrayTimeFormat: string) {
  const timeArrayWithChangedFormat = time_array.map(date => moment(date, arrayTimeFormat).format(config.time_format.momentTimeISOFormat))
  const momentTimeArrayWithChangedFormat = timeArrayWithChangedFormat.map(date => moment(date, config.time_format.momentTimeISOFormat))
  return moment.max(momentTimeArrayWithChangedFormat).format(config.time_format.momentTimeISOFormat)
}

function getISOMinTimeFromArray(time_array: string[], arrayTimeFormat: string) {
  const timeArrayWithChangedFormat = time_array.map(date => moment(date, arrayTimeFormat).format(config.time_format.momentTimeISOFormat))
  const momentTimeArrayWithChangedFormat = timeArrayWithChangedFormat.map(date => moment(date, config.time_format.momentTimeISOFormat))
  return moment.min(momentTimeArrayWithChangedFormat).format(config.time_format.momentTimeISOFormat)
}*/

function momentAddHoursToCustomTime(hours: number, time: string) {
  return moment(time, config.time_format.momentTimeCustomFormat).add(hours, 'hour').format(config.time_format.momentTimeCustomFormat)
}

function momentSubtractHoursFromCustomTime(hours: number, time: string) {
  return moment(time, config.time_format.momentTimeCustomFormat).subtract(hours, 'hour').format(config.time_format.momentTimeCustomFormat)
}

async function defaultSubtractionForEachBooking(time: string, duration: number) {
  const timeIntervalsToCheck: string[] = []
  switch (duration) {
    case 1:
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(0.5, time))
      break;
    case 1.5:
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(0.5, time))
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(1, time))
      break;
    case 2:
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(0.5, time))
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(1, time))
      timeIntervalsToCheck.push(momentSubtractHoursFromCustomTime(1.5, time))
      break;
  }
  return timeIntervalsToCheck
}

async function defaultAddForEachBooking(time: string, duration: number) {

  const timeIntervalsToCheck: string[] = []
  switch (duration) {
    case 1:
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(0.5, time))
      break;
    case 1.5:
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(0.5, time))
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(1, time))
      break;
    case 2:
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(0.5, time))
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(1, time))
      timeIntervalsToCheck.push(momentAddHoursToCustomTime(1.5, time))
      break
  }
  return timeIntervalsToCheck
}


async function durationValidation(courtType: string, courtId: string, date: string, time: string, duration: number) {

  const durationTypeError = await durationTypeValidation(duration)
  if (durationTypeError)
    return durationTypeError

  const intervalsUntilTime = await defaultAddForEachBooking(time, duration)
  const intervalsAfterTime = await defaultSubtractionForEachBooking(time, duration)
  const finalIntervals: string[] = intervalsAfterTime.concat(intervalsUntilTime)


  const court = await CourtBookingModel.find({
    courtType: courtType,
    courtId: courtId,
    date: date,
    startTime: {$in: finalIntervals} //finding if any court booked in startTime interval
  })

/*  const court2 = await CourtBookingModel.find({
    courtType: courtType,
    courtId: courtId,
    date: date,
    endTime: {$in: finalIntervals} //finding if any court booked in startTime interval
  })*/

  if (court.length/* || court2.length*/) {
    if (court.length /*+ court2.length*/ === 1) {
      console.log(`Booked court was found during ${duration}, from ${time}` + JSON.stringify(court))
      return `You can't book a court at ${time}. Booked was court found`
    } else {
      console.log(`Booked courts were found during ${duration}, from ${time}` + JSON.stringify(court))
      return `You can't book a court at ${time}. Booked courts were found`
    }
  }
}

export async function DurationValidation(courtType: string, courtId: string, date: string, time: string, duration: number) {
  const durationValidationError = await durationValidation(courtType, courtId, date, time, duration)
  if (durationValidationError)
    return durationValidationError
}
