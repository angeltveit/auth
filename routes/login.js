const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
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
