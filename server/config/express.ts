import express from 'express'
import passport from './passport'
import cors from 'cors'
import mongoose from './mongoose'
import * as dotenv from 'dotenv'

const app = express()
const allRoutes = require('../routes')
const homeRoute = require('../routes/home.route')

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
mongoose()

app.use(passport.initialize())

app.use(express.static(__dirname + '../../../../../dist/wtc'))

app.use('/api', allRoutes)
app.use('/*', homeRoute);

export default app



