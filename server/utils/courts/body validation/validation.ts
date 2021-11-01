import {durationTypeValidation, guestsValidation, membersValidation, durationValidation} from "./validation.functions";
import {User} from "../../../documents/User";

export async function postCourtsBodyValidation(membersID: string[], guestsID: string[], duration: number, splitPayments: any) {
  if (membersID.length + guestsID.length > 4)
    return [null, 'No more than 4 people allowed']
  if (!(typeof splitPayments === 'boolean'))
    return [null, 'Wrong type of Split Payments variable']

  const durationError = await durationTypeValidation(duration)
  if (durationError)
    return [null, durationError]

  let members, membersError: any
  if (membersID.length > 0)
    [members, membersError] = await membersValidation(membersID)
  if (membersError)
    return [null, membersError]

  let guests, guestsError: any
  if (guestsID.length > 0)
    [guests, guestsError] = await guestsValidation(guestsID)
  if (guestsError)
    return [null, guestsError]


  return [{members: members, guests: guests}, null]
}


export async function postCourtsDurationValidation(courtType: string, courtId: string, date: string, time: string, duration: number) {
  const durationValidationError = await durationValidation(courtType, courtId, date, time, duration)
  if (durationValidationError)
    return durationValidationError
}
