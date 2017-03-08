const jwt = require('jwt-simple')
const config = require('../config.json')
const moment = require('moment')

module.exports = function(req, res, next) {
  // Add create user function here
  let newuser = {
    id: 'FAKE_ID'
  }

  let payload = {
    sub: newuser.id,
    iss: config.issuer,
    aud: config.audience,
    exp: moment().add(1, 'hour')
  }
  res.json({
    token: jwt.encode(payload, config.secretOrKey)
  })
}
