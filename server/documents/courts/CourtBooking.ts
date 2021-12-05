import mongoose from "mongoose";


export type CourtBooking = mongoose.Document & {
    date: string, //ISO format from config.time_format.momentDateISOFormat
    courtType: string,
    courtIds: CourtId[]
}

export type CourtId = mongoose.Document & {
    courtId: number,
    courts: Court[]
}

export type Court = mongoose.Document & {
    _id: mongoose.Schema.Types.ObjectId,
    members: Player[],
    guests: Player[],
    startTime: string,   // both startTime & endTime config.time_format.momentTimeISOFormat
    endTime: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date
}

export type Player = mongoose.Document & {
    _userId: mongoose.Schema.Types.ObjectId,
    fullName: string,
    courtPaymentId: mongoose.Schema.Types.ObjectId
}
