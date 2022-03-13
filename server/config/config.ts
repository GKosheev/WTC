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
  default_user_picture: process.env.DEFAULT_USER_PICTURE_PATH,
  stripe: {
    stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
    stripe_webhook_secret: mod === 'dev' ? process.env.STRIPE_WEBHOOK_SECRET_DEV : process.env.STRIPE_WEBHOOK_SECRET_PROD,
  },
  aws: {
    access_id: process.env.AWS_ACCESS_KEY_ID,
    secret_id: process.env.AWS_SECRET_KEY,
    s3: {
      bucket_name: process.env.AWS_S3_BUCKET_NAME
    }
  },
  time_format: {
    momentDateISOFormat: 'YYYY-MM-DD',
    momentDateCustomFormat: 'MM-DD-YYYY',
    momentTimeCustomFormat: 'hh:mm a',
    momentTimeISOFormat: 'HH:mm',
    momentTimeCustomFullFormat: 'MM-DD-YYYY hh:mm a',
    momentCustomShortDate: "MM-DD"
  },
  roles: {
    admin: 'admin',
    member: 'member',
    nonMember: 'nonMember'
  },
  payment_type: {
    store: 'store',
    subscription: 'sub',
    court: 'court'
  },
  paymentUrls: {
    success_url: mod === 'dev' ? 'http://localhost:4200/#/private/user/purchases' : 'https://waterloo-tennis-club.herokuapp.com/#/private/user/purchases',
    cancel_url: mod === 'dev' ? 'http://localhost:4200/#/private/user/payments' : 'https://waterloo-tennis-club.herokuapp.com/#/private/user/payments'
  },
};


export default config
