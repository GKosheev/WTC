import {CourtInfo, ItemInfo, StripeLineItemsFormat, SubInfo} from "./interfaces";


export function returnSubscriptionStripeFormat(subInfo: SubInfo): StripeLineItemsFormat {

  return {
    price_data: {
      currency: 'cad',
      product_data: {
        name: subInfo.subName,
        description: subInfo.description ? subInfo.description : '-',
        images: subInfo.images, //up to 8 images
        metadata: {subId: subInfo.paymentId}     //subPrefix.concat(subInfo.clubCardId)
      },
      unit_amount: Number((subInfo.price * 100).toFixed(2))
    },
    quantity: 1 //You cannot buy more than 1 subscription
  }
}

export function returnStoreStripeFormat(itemInfo: ItemInfo): StripeLineItemsFormat {
  return {
    price_data: {
      currency: 'cad',
      product_data: {
        name: itemInfo.itemName,
        description: itemInfo.description ? itemInfo.description : '-',//(description)
        images: itemInfo.images, //(images) up to 8 images
        metadata: {strId: itemInfo.paymentId}             //     metadata: storePrefix.concat(itemInfo.clubCardId)
      },
      unit_amount: Number((itemInfo.price * 100).toFixed(2))
    },
    quantity: itemInfo.quantity
  }
}

export function returnCourtStripeFormat(courtInfo: CourtInfo): StripeLineItemsFormat {
  return {
    price_data: {
      currency: 'cad',
      product_data: {
        name: courtInfo.courtType,
        description: courtInfo.description ? courtInfo.description : '-',
        images: courtInfo.images,
        metadata: {crt: courtInfo.paymentId}
      },
      unit_amount: Number((courtInfo.price * 100).toFixed(2))
    },
    quantity: 1
  }
}
