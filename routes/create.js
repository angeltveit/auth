const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  auth.register(req, res, next).then((data)=> {
    if(req.body.email) req.body.email = req.body.email.toLowerCase()
    if(!data) return res.status(403).json({error: 'user exists'})
    let payload = {
      iss: config.issuer,
      aud: config.audience,
      exp: +moment.utc().add((config.expiry || 3600),(config.expiryUnit || 'hour')).format('X')

    }
    payload = Object.assign({}, data, payload)
    res.json({
      token: jwt.encode(payload, config.secretOrKey)
    })
  }).catch(function(err) {
    console.log(err)
    res.status(err.status || 500).json({error: err.message})
  })
}
