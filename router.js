//const router = require('express').Router()
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const passport = require('passport')
module.exports = (router) => {
  passport.use('jwt', require('./strategies/jwt'))
  passport.use('local', require('./strategies/local'))

  const auth = {
    jwt: passport.authenticate('jwt', {session: false}),
    local: passport.authenticate('local', {session: false})
  }

  return router
    .use(passport.initialize())
    .get('/', auth.jwt, require('./routes/profile'))
    .post('/register', require('./routes/create'))
    .post('/login', auth.local, require('./routes/jwt'))
}
