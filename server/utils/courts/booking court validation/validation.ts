import {durationValidation} from "./validation-functions";


export async function bookingCourtValidation(courtType: string, courtId: number, date: string, time: string, duration: number) {
  const durationValidationError = await durationValidation(courtType, courtId, date, time, duration)
  if (durationValidationError)
    return durationValidationError
}
