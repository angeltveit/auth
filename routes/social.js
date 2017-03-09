const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function local(req, res, next) {
  auth.social(req, res, next).then((data)=> {
    let payload = {
      sub: data,
      iss: config.issuer,
      aud: config.audience
    }
    let token = jwt.encode(payload, config.secretOrKey)
    let endpoint = req.query.success || '/'
    let url = `${endpoint}?token=${token}`
    res.redirect(url)
  })
}
