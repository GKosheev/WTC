require('dotenv').config();

const config = {
 port: process.env.PORT,
 mongoURI: process.env.MONGO_URI,
 jwtSecret: process.env.JWT_SECRET,
 baseUrl: process.env.BASE_URL,
 email: process.env.EMAIL,
 password: process.env.EMAIL_PASSWORD,
};

module.exports = config
