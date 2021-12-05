import mongoose from "mongoose";


export interface CourtBooking {
    date: string, //ISO format from config.time_format.momentDateISOFormat
    courtType: string,
    courtIds: CourtId[]
}

export interface CourtId {
    courtId: number,
    courts: Court[]
}

export interface Court {
    members: Player[],
    guests: Player[],
    startTime: string,   // both startTime & endTime config.time_format.momentTimeISOFormat
    endTime: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: Date
}

export interface Player {
    _userId: mongoose.Schema.Types.ObjectId,
    fullName: string,
    courtPaymentId: mongoose.Schema.Types.ObjectId
}
