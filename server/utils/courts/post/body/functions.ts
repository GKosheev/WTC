import {User} from "../../../../documents/user/User";
import UserModel from "../../../../models/user.model";
import config from "../../../../config/config";

export async function membersValidateAndFindByID(membersID: string[]): Promise<[User[], null] | [null, string] | [null,null]> {
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

export async function guestsValidateAndFindByID(guestsID: string[]): Promise<[User[], null] | [null, string] | [null,null]>{
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
  if (duration % 0.5 !== 0)
    return 'Time Validation Error' //that allows to book a court for 1, 1.5 and 2 hours
}

