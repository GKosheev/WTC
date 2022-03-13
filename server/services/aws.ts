import AWS from 'aws-sdk'
import config from "../config/config";

export const s3 = new AWS.S3({
  accessKeyId: config.aws.access_id,
  secretAccessKey: config.aws.secret_id
})

