import passport from 'passport';
import {ExtractJwt} from 'passport-jwt'
import config from '../config/config'
import * as passportStrategy from 'passport-jwt'
import UserModel from '../models/user.model'
import {User} from "../documents/User";
import {NativeError} from "mongoose";


const JwtStrategy = passportStrategy.Strategy

passport.serializeUser<any>((user, done) => {
  done(null, user) // user._id
})

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, (err: NativeError, user: User) => done(err, user));
})

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtLogin = new JwtStrategy(options, (jwt_payload, done) => {
  UserModel.findOne({_id: jwt_payload.sub}, (err: NativeError, user: User) => {
    if (err)
      return done(err, false)
    if (!user)
      return done('User was not found', false)
    let user_: any = user.toObject()
    delete user_.hashedPassword
    return done(null, user_)
  })
})


passport.use(JwtLogin)
export default passport
