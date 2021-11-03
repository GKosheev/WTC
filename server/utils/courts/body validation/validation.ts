import {
  guestsValidateAndFindByID,
  membersValidateAndFindByID,
  durationTypeValidation
} from "./validation-functions";
import {User} from "../../../documents/User";
import {joiBodyValidation} from "./joi-validation";


export async function postCourtsBodyValidation(membersID: string[], guestsID: string[], duration: number) {
  if (membersID.length + guestsID.length > 4)
    return [null, 'No more than 4 people allowed']
  if (membersID.length < 1)
    return [null, 'At least 1 member has to be in booking list']

  const durationError = await durationTypeValidation(duration)
  if (durationError)
    return [null, durationError]

  let [members, guests]: [User[] | null, User[] | null] = [null, null]
  let [membersError, guestsError]: [string | null, string | null] = [null, null];


  [members, membersError] = await membersValidateAndFindByID(membersID)
  if (membersError)
    return [null, membersError];

  [guests, guestsError] = await guestsValidateAndFindByID(guestsID)
  if (guestsError)
    return [null, guestsError]


  return [{members: members, guests: guests}, null]
}

export async function validateAndReturnBody(members: any, guests: any, splitPayments: any, duration: any): Promise<[[string[], string[], boolean, number], null] | [null, string]> {
  const {value, error} = await joiBodyValidation.validate({
    members: members,
    guests: guests,
    splitPayments: splitPayments,
    duration: duration
  })
  if (error)
    return [null, `Body error: ${error}`]

  return [[value.members, value.guests, value.splitPayments, value.duration], null]
}


