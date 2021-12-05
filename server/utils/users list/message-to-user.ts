import {joiMessageToUserValidation} from "./joi";
import UserModel from "../../models/user.model";
import {User} from "../../documents/User";
import {sendMessageToUser} from "./email-messages";


export async function msgToUser(subject: string | undefined, text: string | undefined, clubCardId: string | undefined, sender: User): Promise<{ msg: string } | null> {
    if (!subject || !text || !clubCardId)
        return {msg: 'Validation error'}

    const messageToUserValidation = await joiMessageToUserValidation.validate({
        subject: subject,
        text: text
    })
    if (messageToUserValidation.error)
        return {msg: messageToUserValidation.error.message}

    const user = await UserModel.findOne({clubCardId: clubCardId})
    if (!user)
        return {msg: `User doesn't exist`}
    const fullSenderName = sender.profile.firstName + ' ' + sender.profile.lastName
    await sendMessageToUser(user.profile.email, fullSenderName, subject, text)
    return null
}
