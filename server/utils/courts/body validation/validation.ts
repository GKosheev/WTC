import {durationTypeValidation, guestsValidation, membersValidation} from "./validation.functions";
import moment from "moment";
import CourtBookingModel from "../../../models/court_booking.model";
import config from "../../../config/config";

export async function postCourtsBodyValidation(membersID: string[], guestsID: string[], duration: number, splitPayments: any) {
  if (membersID.length + guestsID.length > 4)
    return [null, 'No more than 4 people allowed']
  if (!(typeof splitPayments === 'boolean'))
    return [null, 'Wrong type of Split Payments variable']

  const durationError = await durationTypeValidation(duration)
  if (durationError)
    return [null, durationError]

  const [members, membersError] = await membersValidation(membersID)
  if (membersError)
    return [null, membersError]

  const [guests, guestsError] = await guestsValidation(guestsID)
  if (guestsError)
    return [null, guestsError]

  return [{members: members, guests: guests}, null]
}

export async function durationValidation(courtType: string, courtId: string, date: string, time: string, duration: number) {
/*  1, 1.5, 2
  we must check:
  after 0.5 && 1 for one hour duration
  after 0.5 && 1 && 1.5 for one and a half hours duration
  after 0.5 && 1 && 1.5 && 2 for two hours duration
 */
  // time must be generated using moment.add(time, config.time_format.momentTimeFormat).add(0.5, 'hour').format(config.time_format.momentTimeFormat)
  //  find all courts in range using $in operator for 'time'
  const court = CourtBookingModel.findOne({})
}

export async function postCourtsDurationValidation(courtType: string, courtId: string, date: string, duration: number) {

}
