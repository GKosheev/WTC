import app from './config/express'
import config from "./config/config";

const port = config.port || 5000;

app.listen(port);
