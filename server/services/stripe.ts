import config from "../config/config";

const stripe = require('stripe')(config.stripe_private_key)
export default stripe

