import {Request, Response} from "express";
import stripe from '../services/stripe'

export async function payment(req: Request, res: Response) {
  // TODO req.params.items [id: mongoose.objectId, type: string (court or store), quantity]
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: req.body.items.map(item => {
      //TODO
    })
  })
}
