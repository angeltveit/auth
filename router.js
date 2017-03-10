const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const FbStrategy = require('passport-facebook').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('./index').config
const express = require('express')
const passport = require('passport')

module.exports = () => {
  const router = express.Router()

  passport.use('jwt', require('./strategies/jwt'))
  passport.use('local', require('./strategies/local'))
  passport.use('facebook', require('./strategies/facebook'))

  const auth = {
    jwt: passport.authenticate('jwt', {session: false}),
    local: passport.authenticate('local', {session: false}),
    facebook: function(req, res, next) {
      let uri = `/facebook/callback?success=${encodeURIComponent(req.query.success)}`
      passport.authenticate('facebook', {
        callbackURL: config.authEndPoint + uri,
        session: false,
        scope: config.facebook.scope,
        failureRedirect: req.query.failure || '/'
      })(req, res, next)
    }
  }

  return router
    .use(passport.initialize())
    // Local routes
    .post('/register', require('./routes/create'))
    .post('/login', require('./routes/login'))
    .get('/', auth.jwt, require('./routes/profile'))
    // Social logins
    .get('/facebook', auth.facebook, require('./routes/create'))
    .get('/facebook/callback', auth.facebook, require('./routes/social'))
}
