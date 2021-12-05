import config from "../config/config";

const stripe = require('stripe')(config.stripe.stripe_private_key,{
    apiVersion: '2020-08-27',
})
export default stripe

