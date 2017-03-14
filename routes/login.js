const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  auth.login(req, res, next).then((data)=> {
    if(!data) return res.status(403).json({error: 'Invalid user'})
    let payload = {
      iss: config.issuer,
      aud: config.audience
    }
    payload = Object.assign({}, data, payload)
    res.json({
      token: jwt.encode(payload, config.secretOrKey)
    })
  }).catch((err)=> {
    if(process.env.NODE_ENV== 'development') {
      return res.status(403).json({error: 'Database error', output: err})
    }
    res.status(403).json({error: 'Database error'})
  })
}
