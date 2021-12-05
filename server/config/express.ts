import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import mongoose from '../services/mongoose'
import * as dotenv from 'dotenv'
import config from "./config";
import path from "path";
import allRoutes from '../routes'

const app = express()
dotenv.config()


app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/api/payments/webhook')) {
    next();
  } else {
    express.json()(req, res, next);
  }
});
/*
app.use(express.json())*/
app.use(express.urlencoded({extended: true}))
app.use(cors());
mongoose().then(() => {
  console.log('MongoDB started')
})

app.use(express.static(config.home_static_path))

app.use('/api', allRoutes)
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, config.send_file_path));
});

export default app



