const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  if(req.body.email) req.body.email = req.body.email.toLowerCase()
  auth.login(req, res, next).then((data)=> {
    if(!data) return res.status(403).json({error: 'Invalid user'})
    let payload = {
      iss: config.issuer,
      aud: config.audience,
      exp: moment().add(1,'hour')
    }
    payload = Object.assign({}, data, payload)
    res.json({
      token: jwt.encode(payload, config.secretOrKey)
    })
  }).catch((err)=> {
    if(process.env.NODE_ENV == 'development') {
      res.status(403).json({error: err.message, output: err})
    }
    console.log(err)
    res.status(403).json({error: err.message})
  })
}
