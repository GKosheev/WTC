import config from '../config/config'
import {connect} from 'mongoose'

async function startDB(): Promise<void> {
  try {
    await connect(String(config.mongoURI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  } catch (error) {
    console.log('Mongoose startDB error: ', error)
    process.exit(1)
  }
}

export default startDB
