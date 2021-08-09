const mongoose = require('mongoose')

const userProfile = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
  },
  registrationType: {
    type: String,
    required: true
  },
  phone: {
    type: String, required: true
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date, required: true
  },
  memberID: {
    type: String, required: true// , unique: true
  },
  twitter: {type: String},
  instagram: {type: String},
  facebook: {type: String},
  receiveClubEmails: {
    type: Boolean, required: true
  },
  shareMyEmail: {type: Boolean},
  rating: {type: String}
}, {_id:false})

const schema = new mongoose.Schema({
  profile: {type: userProfile},
  securityQuestion: {
    type: String, required: true
  },
  securityAnswer: {
    type: String, required: true
  },
  clubPolicy: {
    type: String, required: true
  },
  privacyPolicy: {
    type: String, required: true
  },
  covidPolicy: {
    type: String, required: true
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, required: true, default: Date.now},
  roles: [{type: String}]
})


module.exports = mongoose.model('User', schema)
