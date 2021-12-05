/* Send Personal Message To User */
import {messageForUser} from "../../services/sendgrid";

export async function sendMessageToUser(sendTo: string, name: string, subject: string, text: string) {
  await messageForUser(sendTo, name, subject, text)
}
