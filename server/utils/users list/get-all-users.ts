import UserModel from "../../models/user.model";
import {UsersList} from "../../interfaces/users list/UsersList";

export async function getAllUsers(): Promise<UsersList[]> {
    const users = await UserModel.find({isVerified: true})
    const usersList: UsersList[] = []

    for await (const user of users) {
        if (user.isVerified)
            usersList.push({
                clubCardId: user.clubCardId,
                fullName: user.profile.firstName + ' ' + user.profile.lastName,
                phone: user.profile.shareMyPhone ? user.profile.phone : '-',
                email: user.profile.shareMyEmail ? user.profile.email : '-',
                rating: user.profile.rating,
            })
    }
    return usersList
}
