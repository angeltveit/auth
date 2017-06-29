const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {

  auth.refresh(req, res, next).then((data)=> {
    if(!data) return res.status(403).json({error: 'Invalid user'})
    let payload = {
      iss: config.issuer,
      aud: config.audience,
      exp: +moment.utc().add((config.expiry || 3600),(config.expiryUnit || 'hour')).format('X')
    }
    payload = Object.assign({}, data, payload)
    try {
      res.json({
        user: data,
        token: jwt.encode(payload, config.secretOrKey)
      })
    } catch (err){
      res.status(500).json({message: error.message})
    }

  }).catch((err)=> {
    if(process.env.NODE_ENV == 'development') {
      res.status(403).json({error: err.message, output: err})
    }
    console.log(err)
    res.status(403).json({error: err.message})
  })
}
