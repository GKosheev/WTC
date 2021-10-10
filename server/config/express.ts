import express from 'express'
import passport from '../middleware/passport'
import cors from 'cors'
import mongoose from '../services/mongoose'
import * as dotenv from 'dotenv'
import config from "./config";
import path from "path";

const app = express()
const allRoutes = require('../routes')

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
mongoose().then(() => {
  console.log('MongoDB started')
})

app.use(passport.initialize())

app.use(express.static(config.home_static_path))

app.use('/api', allRoutes)
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, config.send_file_path));
});

export default app



