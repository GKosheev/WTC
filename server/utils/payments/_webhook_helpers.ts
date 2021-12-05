import {StripeMetadata} from "./interfaces";
import StripePaymentModel from "../../models/stripe/stripe-payment.model";
import SubPaymentModel from "../../models/subscription/sub-payment.model";
import moment from "moment";
import config from "../../config/config";
import {updateUserSubscription} from "../../services/db services/UserService";

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

        if (userStripePayment.ids.subIds.length) {
            const paidDate = moment(moment.now()).format(config.time_format.momentTimeCustomFullFormat)
            for (const subId of userStripePayment.ids.subIds) {
                const sub = await SubPaymentModel.findOneAndUpdate({
                    clubCardId: metadata.clubCardId,
                    "subPayments._id": subId
                }, {$set: {"subPayments.$.paymentInfo.paid": true, "subPayments.$.paymentInfo.paidAt": paidDate}})
                if (!sub)
                    return `Payment wasn't found`
                const updateSubError = await updateUserSubscription(metadata.clubCardId, subId, sub)
                if (updateSubError)
                    return updateSubError
            }
        }
        if (userStripePayment.ids.courtIds.length) {
            //TODO search courtPaymentId && update "paid" status
        }
        if (userStripePayment.ids.storeIds.length) {
            //TODO search storePaymentId && update "paid" status
        }
        return null
    } catch (err) {
        return `err: ${JSON.stringify(err)}`
    }

}
