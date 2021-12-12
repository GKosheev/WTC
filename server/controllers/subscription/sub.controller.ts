import {Request, Response} from "express";
import {SubConfig, SubConfigType} from "../../documents/subscription/SubConfig";
import SubConfigModel from "../../models/subscription/sub-config.model";
import {User} from "../../documents/User";
import SubPaymentModel from "../../models/subscription/sub-payment.model";
import mongoose from "mongoose";
import {subDurationToISO} from "../../utils/subscription/sub_helpers";
import moment from "moment";
import config from "../../config/config";


export async function getAllSubscriptions(req: Request, res: Response) {
  const allSubs: SubConfig[] = await SubConfigModel.find({})
  return res.status(200).send(allSubs)
}


interface ShortSubPayment {
  images?: string[],
  paymentInfo: {
    price: number,
  },
  subInfo: {
    subType: string,
    subName: string,
    description?: string,
    subStart: string,
    subEnd: string
  },
  subId: mongoose.Schema.Types.ObjectId
}


function calculateFinalPrice(origPrice: number, subStartsISO: string, subEndsISO: string): number {
  const dateNowISO = moment(moment.now()).format(config.time_format.momentDateISOFormat)

  const isBefore = moment(dateNowISO, config.time_format.momentDateISOFormat).isBefore(subStartsISO)
  const isSame = moment(dateNowISO, config.time_format.momentDateISOFormat).isSame(subStartsISO)
  if (isBefore || isSame)
    return origPrice

  const isBetween = moment(dateNowISO, config.time_format.momentDateISOFormat).isAfter(subStartsISO) && moment(dateNowISO, config.time_format.momentDateISOFormat).isBefore(subEndsISO)
  if (isBetween) {
    const allDays = moment.duration(moment(subEndsISO).diff(moment(subStartsISO))).asDays()
    const daysToPlay = moment.duration(moment(subEndsISO).diff(moment(dateNowISO))).asDays()

    const finalPrice = (origPrice / allDays) * daysToPlay
    return Number(finalPrice.toFixed(2))
  }
  /*
    const isAfterOrIsSame = moment(dateNowISO, config.time_format.momentDateISOFormat).isAfter(subEndsISO) ||
     moment(dateNowISO, config.time_format.momentDateISOFormat).isSame(subEndsISO)
  */
  return 0;
}

function initShortSubPayment(sub: SubConfig, subInfo: SubConfigType): ShortSubPayment {
  const [subStartsISO, subEndsISO] = subDurationToISO(sub.subStart, sub.subEnd)
  return {
    images: sub.images,
    subInfo: {
      subType: sub.subType,
      subName: subInfo.name,
      description: subInfo.description,
      subStart: subStartsISO,
      subEnd: subEndsISO
    },
    paymentInfo: {
      price: calculateFinalPrice(subInfo.price, subStartsISO, subEndsISO),
    },
    subId: sub._id
  }
}


export async function addSubToPayments(req: Request, res: Response) {
  const user: User = res.locals.user
  const subPayment = await SubPaymentModel.findOne({clubCardId: user.clubCardId})
  const paymentToAdd: ShortSubPayment = initShortSubPayment(res.locals.subscription, res.locals.subInfo)
  if (!subPayment) { // if user have never bought any subscription
    const initNewUser = new SubPaymentModel({
      subPayments: [paymentToAdd]
    })
    initNewUser.clubCardId = user.clubCardId
    await initNewUser.save() //init sub payment with new user
    return res.status(200).json({msg: 'Payment has been inited'})
  }

  await SubPaymentModel.updateOne({clubCardId: user.clubCardId}, {$push: {subPayments: paymentToAdd}})
  return res.status(200).json({msg: 'Payment has been added'})
}
