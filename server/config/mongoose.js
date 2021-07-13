const config = require('../config/config')
const mongoose = require('mongoose')

async function startDB(){
    try{
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
    }
    catch (error){
        console.log('Server error ', error.message)
        process.exit(1)
    }
}

module.exports = startDB
