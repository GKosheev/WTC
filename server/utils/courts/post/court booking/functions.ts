import {OldUser} from "../../../../documents/old documents/user/OldUser";
import mongoose from "mongoose";
import CourtPaymentsModel from "../../../../models/old models/courts/court-payments.model";

const membersPrice = 10 * 100 //cents
const guestsPrice = 40 * 100 // cents

async function calculateThePrice(members: number, guests: number): Promise<[number, number]> {
  return [membersPrice / (members + guests), guestsPrice / (members + guests)]
}

async function createPayments(users: OldUser[], price: number, date: string, startTime: string, endTime: string) {
  const usersPayment: mongoose.Schema.Types.ObjectId[] = []
  for (const user of users) {
    const userPayment = await new CourtPaymentsModel({
      _userId: user.profile.memberID,
      price: price,
      date: date,
      startTime: startTime,
      endTime: endTime
    })
    usersPayment.push(userPayment._id)
    await userPayment.save()
  }
  return usersPayment
}

export async function returnPaymentIds(members: OldUser[], guests: OldUser[], date: string, startTime: string, endTime: string) {
  const [membersPrice, guestsPrice] = await calculateThePrice(members.length, guests.length)

  const membersPaymentsIds = await createPayments(members, membersPrice, date, startTime, endTime) // returning array of PaymentsIds
  const guestsPaymentsIds = await createPayments(guests, guestsPrice, date, startTime, endTime)
  return [membersPaymentsIds, guestsPaymentsIds]
}
