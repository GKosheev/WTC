import {User} from "../../documents/User";
import UserModel from "../../models/user.model";
import config from "../../config/config";
import moment from "moment";

export async function setSubStatusToDefault(user: User) {
  const updateUser = await UserModel.findOneAndUpdate({clubCardId: user.clubCardId}, {
    $set: {
      roles: [config.roles.nonMember],
      'subscription.type': config.roles.nonMember,
      'subscription.subStarts': '-',
      'subscription.subEnds': '-',
      'subscription.price': '-',
      'subscription.paidAt': '-'
    }
  }, {
    new: true
  })
  return updateUser
}

export function subExpired(subStarts: string, subEnds: string): boolean {
  const dateNow = moment(moment.now()).format(config.time_format.momentDateISOFormat)
  const final_sub_starts = moment(moment(subStarts, config.time_format.momentDateISOFormat).add(-1, 'days').format(config.time_format.momentDateISOFormat), config.time_format.momentDateISOFormat)
  const final_sub_ends = moment(moment(subEnds, config.time_format.momentDateISOFormat).add(1, 'days').format(config.time_format.momentDateISOFormat), config.time_format.momentDateISOFormat)
  // return moment(dateNow, config.time_format.momentDateISOFormat).isAfter(moment(subEnds, config.time_format.momentDateISOFormat))
  return !(moment(dateNow).isAfter(final_sub_starts) && moment(dateNow).isBefore(final_sub_ends))
}


export function subDurationToISO(subStarts: string, subEnds: string): [string, string] {
  const sub_start = subStarts
  const sub_end = subEnds

  const sub_start_to_compare = moment(sub_start, config.time_format.momentCustomShortDate).format(config.time_format.momentDateISOFormat)
  const sub_end_to_compare = moment(sub_end, config.time_format.momentCustomShortDate).format(config.time_format.momentDateISOFormat)

  let final_sub_start;
  let final_sub_end;
  if (!moment(sub_start_to_compare).isBefore(sub_end_to_compare)) {
    final_sub_start = moment(sub_start + '-' + moment().format('YYYY'), config.time_format.momentDateCustomFormat).format(config.time_format.momentDateISOFormat)
    final_sub_end = moment(sub_end + '-' + String(Number(moment().format('YYYY')) + 1), config.time_format.momentDateCustomFormat).format(config.time_format.momentDateISOFormat)

  } else {
    final_sub_start = sub_start_to_compare
    final_sub_end = sub_end_to_compare
  }

  return [final_sub_start, final_sub_end]
}


export function curTimeWithinSubRange(subStarts: string, subEnds: string): boolean {
  const [subStartsISO, subEndsISO] = subDurationToISO(subStarts, subEnds)
  const subStartsForRangeISO = moment(moment(subStartsISO, config.time_format.momentDateISOFormat).add(-1, 'days').format(config.time_format.momentDateISOFormat))
  const subEndsForRangeISO = moment(moment(subEndsISO, config.time_format.momentDateISOFormat).add(1, 'days').format(config.time_format.momentDateISOFormat))
  const dateNow = moment(moment.now()).format(config.time_format.momentDateISOFormat)
  return moment(dateNow).isAfter(subStartsForRangeISO) && moment(dateNow).isBefore(subEndsForRangeISO)
}
