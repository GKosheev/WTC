import {Request, Response} from 'express'
import {getAllUsers} from "../utils/users list/get-all-users";
import {getUserByClubCardId} from "../utils/users list/get-user-by-id";
import {msgToUser} from "../utils/users list/message-to-user";
import {User} from "../documents/User";

export async function allUsers(req: Request, res: Response) {
    const users = await getAllUsers()
    return res.status(200).json(users)
}


export async function getUserById(req: Request, res: Response) {
    const [user, getUserError] = await getUserByClubCardId(req.params.clubCardId)
    if (getUserError)
        return res.status(400).json(getUserError)

    return res.status(200).json(user)
}


export async function messageToUser(req: Request, res: Response) {
    const user: User = res.locals.user
    const msgToUserError = await msgToUser(req.body.subject, req.body.text, req.params.clubCardId, user)
    if (msgToUserError)
        return res.status(400).json(msgToUserError)
    return res.status(200).json({msg: 'Message has been sent'})
}



