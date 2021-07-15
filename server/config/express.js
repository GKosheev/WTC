const express = require('express');
const app = express()
const passport = require('passport');
const cors = require('cors');

const allRoutes = require('../routes/index')
const homeRoute = require('../routes/home.route')
const mongoose = require('../config/mongoose')

require('../config/passport')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
mongoose()

app.use(passport.initialize())

app.use(express.static(__dirname + '../../../dist/wtc'))

app.use('/api', allRoutes)
app.use('/*', homeRoute);

module.exports = app



