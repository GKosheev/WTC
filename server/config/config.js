require('dotenv').config();

const config = {
 port: process.env.PORT,
 mongoURI: process.env.MONGO_URI,
 jwtSecret: process.env.JWT_SECRET,
 baseUrl: process.env.BASE_URL
};

module.exports = config
