const express = require('express')
const app = express();
const homeRoutes = require('../routes/home.route')


app.use(express.static(__dirname + '../../../dist/wtc'))
app.use('/*', homeRoutes);

module.exports = app
