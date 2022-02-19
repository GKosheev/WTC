import {Request, Response} from "express";
import mongoose from "mongoose";
import ItemTagModel from "../../models/store/item-tag.model";
import {ItemTag} from "../../documents/store/ItemTag";
import {User} from "../../documents/User";
import Joi from "joi";


export async function getAllStoreTags(req: Request, res: Response){
  const allCategories: ItemTag[] = await ItemTagModel.find({})
  return res.status(200).send(allCategories)
}
