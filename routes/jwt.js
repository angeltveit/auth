const jwt = require('jwt-simple')
const config = require('../config.json')
const moment = require('moment')
module.exports = function local(req, res, next) {
  let payload = {
    sub: req.user.id,
    iss: config.issuer,
    aud: config.audience,
    //exp: moment().add(1, 'hours')
  }
  res.json({
    token: jwt.encode(payload, config.secretOrKey)
  })
}
