const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jwt-simple')
const ExtractJwt = require('passport-jwt').ExtractJwt
const auth = require('../index')
const config = auth.config

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  aud: config.audience,
  iss: config.issuer,
  secretOrKey: config.secretOrKey
}
console.log(config)
module.exports = new JwtStrategy(options,function(token, done) {
  let user = token.sub
  if(user) return done(null, user)
  if(!user) return done(null, false)
})
