import {Request, Response} from "express";

module.exports.protected = function (req: Request, res: Response) {
    res.json("You are authorized. SPIT YEEEEEEEEEEEAAAAAAAAAAH")
}
