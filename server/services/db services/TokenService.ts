import {Token} from "../../documents/Token";
import TokenModel from "../../models/token.model";
import mongoose from "mongoose";
import * as crypto from 'crypto'


export async function initToken(userId: mongoose.Schema.Types.ObjectId, randomBytesLength: number): Promise<[Token, null] | [null, string]>  {
    try {
        const token = await new TokenModel({_userId: userId, token: crypto.randomBytes(randomBytesLength).toString('hex')})
        await token.save()
        return [token, null]
    } catch (error) {
        return [null, JSON.stringify(error)]
    }
}

export async function findTokenById(tokenId: string): Promise<[Token, null] | [null, string]> {
    const token = await TokenModel.findOne({token: tokenId})
    if (!token)
        return [null, `Token ${tokenId} doesn't exist`]
    return [token, null]
}
