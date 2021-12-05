import jsonwebtoken from "jsonwebtoken";
import config from "../../config/config";
import {User} from "../../documents/User";

interface IGenerateToken {
    token: string,
    expires: string
}

export function generateToken(user: User): IGenerateToken {
    const _id = user._id
    const expiresIn = '1h'
    const payload = {
        sub: _id
    }

    const signedToken = jsonwebtoken.sign(payload, String(config.jwtSecret), {expiresIn: expiresIn})
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}
