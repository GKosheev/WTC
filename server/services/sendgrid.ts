import sgMail from '@sendgrid/mail'
import config from "../config/config";
import moment from "moment";

if (config.sendgrid_api_key)
  sgMail.setApiKey(config.sendgrid_api_key)
else
  console.log('Wrong sendgridAPI (sendgrid.ts)')


export async function sendMessage(to: string, subject: string, text: string, html?: string | undefined) {
  const msg = {
    to: to,
    from: {
      name: 'WTC',
      email: config.sendgrid_verified_email || ''
    },
    subject: subject,
    text: text,
    html: html
  }
  await sgMail.send(msg)
}

export async function messageForUser(to: string, yourName: string, subject: string, text: string) {
  const msg = {
    to: to,
    from: {
      name: yourName,
      email: config.sendgrid_verified_email!
    },
    subject: subject,
    text: text,
  }
  await sgMail.send(msg)
}

export async function receiptMessage(to: string, receipt: string, time: number) {
  const dateOfPurchase: string = moment(new Date(time * 1000)).format('MM-DD-YYYY hh:mm:ss a')
  const msg = {
    to: to,
    bcc: {
      email: config.sendgrid_verified_email!, // to have a copy of receipt and email of user who bought item
      name: to
    },
    from: {
      name: 'WTC',
      email: config.sendgrid_verified_email!
    },
    subject: `Purchase Receipt (${dateOfPurchase})`,
    text: `Thanks for your purchase in Waterloo Tennis Club!\nHere is you receipt:\n ${receipt}\n Purchased at: ${dateOfPurchase}`
  }
  await sgMail.send(msg)
}
