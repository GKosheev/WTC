import {OldUser} from "../../../../documents/old documents/user/OldUser";
import OldUserModel from "../../../../models/old models/oldUserModel";
import config from "../../../../config/config";

export async function membersValidateAndFindByID(membersID: string[]): Promise<[OldUser[], null] | [null, string] | [null,null]> {
  if (!(membersID.length > 0))
    return [null, null]

  let members: OldUser[] = []
  for await (let memberID of membersID) {
    const user = await OldUserModel.findOne({'profile.memberID': memberID})
    if (!user)
      return [null, `Member with id '${memberID}' does not exist`]

    if (user.roles.includes(config.roles.nonMember))
      return [null, `User '${user.profile.firstName + ' ' + user.profile.lastName}' doesn't have a subscription`]
    members.push(user)
  }
  return [members, null] //all found members
}

export async function guestsValidateAndFindByID(guestsID: string[]): Promise<[OldUser[], null] | [null, string] | [null,null]>{
  if (!(guestsID.length > 0))
    return [null, null];

  let guests: OldUser[] = []
  for await (let guestID of guestsID) {
    const user = await OldUserModel.findOne({'profile.memberID': guestID})
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

