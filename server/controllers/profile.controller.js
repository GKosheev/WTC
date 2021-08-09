const User = require('../models/user.model')
const mongoose = require('mongoose');


module.exports.editProfile = async function (req, res) {
  let id = mongoose.Types.ObjectId(req.body.id)
  let profile = req.body.profile
  await User.collection.updateOne({_id: id},
    {
      $set:
        {
          "profile.firstName": profile.firstName,
          "profile.lastName": profile.lastName,
          "profile.twitter": profile.twitter,
          "profile.instagram": profile.instagram,
          "profile.facebook": profile.facebook,
          "profile.receiveClubEmails": profile.receiveClubEmails,
          "profile.shareMyEmail": profile.shareMyEmail
        }
    })
    .then(obj => {
      res.send({message: "ok"})
    }).catch(error => {
      res.send({error: error})
    })
}
