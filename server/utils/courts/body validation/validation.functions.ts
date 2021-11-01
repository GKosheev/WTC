import {User} from "../../../documents/User";
import UserModel from "../../../models/user.model";
import config from "../../../config/config";
import {joiDurationValidation} from "./joi.validation";
import moment from "moment";
import CourtBookingModel from "../../../models/court_booking.model";

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

export async function durationTypeValidation(duration: number) {
  const durationValidation = await joiDurationValidation.validate({duration: duration})
  if (durationValidation.error)
    return durationValidation.error.message

  if (duration % 0.5 !== 0)
    return 'Time Validation Error' //that allows to book a court for 1, 1.5 and 2 hours
}


function momentAddHoursToTime(hours: number, time: string) {
  return moment(time, config.time_format.momentTimeFormat).add(hours, 'hour').format(config.time_format.momentTimeFormat)
}

export async function durationValidation(courtType: string, courtId: string, date: string, time: string, duration: number) {

  /*  1, 1.5, 2
    we must check:
    after 0.5 for one hour duration
    after 0.5 && 1 for one and a half hours duration
    after 0.5 && 1 && 1.5 for two hours duration
   */
  // time must be generated using moment(time, config.time_format.momentTimeFormat).add(0.5, 'hour').format(config.time_format.momentTimeFormat)
  //  find all courts in range using $in operator for 'time'

  const courtTimeIntervals: string[] = []
  switch (duration) {
    case 1:
      courtTimeIntervals.push(momentAddHoursToTime(0.5, time))
      break;
    case 1.5:
      courtTimeIntervals.push(momentAddHoursToTime(0.5, time))
      courtTimeIntervals.push(momentAddHoursToTime(1, time))
      break;
    case 2:
      courtTimeIntervals.push(momentAddHoursToTime(0.5, time))
      courtTimeIntervals.push(momentAddHoursToTime(1, time))
      courtTimeIntervals.push(momentAddHoursToTime(1.5, time))
      break
    default:
      return 'Something went wrong in entered Duration'
  }
  const court = await CourtBookingModel.find({
    courtType: courtType,
    courtId: courtId,
    date: date,
    startTime: {$in: courtTimeIntervals} //finding if any court booked in 'duration' hours
  })
  // change find method
  console.log(JSON.stringify(court))
  if (court.length) {
    if (court.length === 1) {
      console.log(`Booked court was found during ${duration}, from ${time}` + JSON.stringify(court))
      return `You can't book a court at ${time}. Booked was court found`
    } else {
      console.log(`Booked courts were found during ${duration}, from ${time}` + JSON.stringify(court))
      return `You can't book a court at ${time}. Booked courts were found`
    }
  }
}
