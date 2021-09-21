import * as dotenv from 'dotenv'
dotenv.config()
/*


const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
 */


const config = {
 port: process.env.PORT,
 mongoURI: process.env.MONGO_URI,
 jwtSecret: process.env.JWT_SECRET,
 baseUrl: process.env.BASE_URL,
 email: process.env.EMAIL,
 password: process.env.EMAIL_PASSWORD,
 sendgrid_verified_email: process.env.SENDGRID_VERIFIED_SENDER,
};

export default config
