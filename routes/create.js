const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  auth.register(req, res, next).then((data)=> {
    if(!data) return res.status(403).json({error: 'user exists'})
    let payload = {
      iss: config.issuer,
      aud: config.audience
    }
    payload = Object.assign({}, data, payload)
    res.json({
      token: jwt.encode(payload, config.secretOrKey)
    })
  })
}
