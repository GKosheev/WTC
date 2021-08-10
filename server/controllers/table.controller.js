const User = require('../models/user.model')
const mongoose = require('mongoose');

module.exports.users = async function (req, res) {
  await User.find({}, (err, users) => {
    let userMap = [];
    users.forEach((user) => {
      userMap.push({
        'id': user._id,
        'user': {
          'fullName': user.profile.firstName + ' ' + user.profile.lastName,
          'phone': user.profile.phone,
          'email': user.profile.shareMyEmail ? user.profile.email : '-',
          'rating': user.profile.rating
        }
      })
    })
    res.status(200).json(userMap)
  })
}
