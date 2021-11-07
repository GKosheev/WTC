import {NextFunction, Request, Response} from "express";
import {User} from "../documents/user/User";

function authRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: User = <User>req.user
    if (!user.roles.some(role => roles.includes(role)))
      return res.status(400).json({msg: `You don't have a permission to access it`})
    return next()
  }
}

export default authRole
