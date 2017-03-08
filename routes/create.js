const jwt = require('jwt-simple')
const config = require('../config.json')
const moment = require('moment')
const auth = require('../index')

module.exports = function(req, res, next) {
  auth.register(req, res, next).then((data)=> {
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
