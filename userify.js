const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy

module.exports = function(req, res, next) {
  passport.authorize('jwt', {session: false}, function(err) {
    console.log('data', req.account)
    next()
  })

}
