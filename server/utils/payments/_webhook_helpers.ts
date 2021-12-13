import {StripeMetadata} from "./interfaces";
import StripePaymentModel from "../../models/stripe/stripe-payment.model";
import SubPaymentModel from "../../models/subscription/sub-payment.model";
import moment from "moment";
import config from "../../config/config";
import {updateUserSubscription} from "../../services/db services/UserService";
import StorePaymentModel from "../../models/store/store-payments.model";

export async function updatePaidStatus(metadata: StripeMetadata) {
  try {
    if (!metadata.paymentId || !metadata.clubCardId)
      return 'Metadata Error'
    const userStripePayment = await StripePaymentModel.findOneAndDelete({
      userId: metadata.clubCardId,
      _id: metadata.paymentId
    })
    if (!userStripePayment)
      return 'Payment not found'

    const paidDate = moment(moment.now()).format(config.time_format.momentTimeCustomFullFormat)
    if (userStripePayment.ids.subIds.length) {
      const oneAndOnlyPossibleSub = userStripePayment.ids.subIds[0]
      const sub = await SubPaymentModel.findOneAndUpdate({
        clubCardId: metadata.clubCardId,
        subPayments: {$elemMatch: {_id: oneAndOnlyPossibleSub}}
      }, {$set: {"subPayments.$.paymentInfo.paid": true, "subPayments.$.paymentInfo.paidAt": paidDate}}, {new: true})
      if (!sub)
        return `Payment wasn't found`
      const updateSubError = await updateUserSubscription(metadata.clubCardId, oneAndOnlyPossibleSub, sub)
      if (updateSubError)
        return updateSubError
    }
    if (userStripePayment.ids.storeIds.length) {
      for (const itemId of userStripePayment.ids.storeIds) {
        const item = await StorePaymentModel.findOneAndUpdate({
          clubCardId: metadata.clubCardId,
          storePayments: {$elemMatch: {_id: itemId}}
        }, {$set: {"storePayments.$.paymentInfo.paid": true, "storePayments.$.paymentInfo.paidAt": paidDate}})
        if (!item)
          return `Item with id ${itemId} wasn't found`
      }
    }

    if (userStripePayment.ids.courtIds.length) {
      //TODO search courtPaymentId && update "paid" status
    }
    return null
  } catch (err) {
    return `err: ${JSON.stringify(err)}`
  }
}
