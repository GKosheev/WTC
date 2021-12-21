import {Request, Response} from "express";
import CourtsConfigModel from "../../models/courts/courts-config.model";


interface GeneralCourtInfo {
  images: string[],
  courtType: string,
  description: string
}

export async function getGeneralCourtsInfo(req: Request, res: Response) {
  const courts = await CourtsConfigModel.find({})
  const generalCourtInfo: GeneralCourtInfo[] = []
  for await (const court of courts) {
    generalCourtInfo.push({
      images: court.images,
      courtType: court.courtType,
      description: court.description
    })
  }
  return res.status(200).json(generalCourtInfo)
}

export async function getCourts(req: Request, res: Response) {
  //  /:courtType/:date
  const courtType = req.params.courtType

  const courts = await CourtsConfigModel.findOne({courtType: courtType})
  return res.status(200).json(courts)
}
