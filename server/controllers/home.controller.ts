import path from 'path'
import {Request, Response} from 'express'

module.exports.home = function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../../wtc/index.html'));
}
