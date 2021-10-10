import * as dotenv from 'dotenv'

const mod: string = process.env.NODE_ENV!
if (mod === 'prod')
  dotenv.config({path: __dirname + '/../../../../.env'})
else
  dotenv.config({path: __dirname + '/./../../.env'})


const static_path = __dirname + '../../../../../dist/wtc'
const send_file_path = mod === 'prod' ? '../../../../dist/wtc/' + '/index.html' : '../../dist/' + '/index.html'

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_verified_email: process.env.SENDGRID_VERIFIED_SENDER,
  url: mod === 'dev' ? process.env.DEV_URL : process.env.PROD_URL,
  mongoURI: mod === 'dev' ? process.env.DEV_MONGO_URI : process.env.PROD_MONGO_URI,
  home_static_path: static_path,
  send_file_path: send_file_path,
};


export default config
