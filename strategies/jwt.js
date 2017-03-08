const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config.json')

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  aud: config.audience,
  iss: config.issuer,
  secretOrKey: config.secretOrKey
}
console.log(config)
module.exports = new JwtStrategy(options,function(jwt, done) {
  console.log('jwt strategy')
  let user = {
    id: 'FAKE_ID'
  }
  if(user) return done(null, user)
  if(!user) return done(null, false)
})
