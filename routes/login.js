const jwt = require('jwt-simple')
const config = require('../config.json')
const moment = require('moment')
module.exports = function local(req, res, next) {
  auth.login(req, res, next).then((data)=> {
    let payload = {
      sub: data,
      iss: config.issuer,
      aud: config.audience
    }
    res.json({
      token: jwt.encode(payload, config.secretOrKey)
    })
  })
}
