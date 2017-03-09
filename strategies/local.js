const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const auth = require('../index')
const config = auth.config

module.exports = new LocalStrategy(function(username, password, done) {
    auth.login(username, password).then(user=> {
      if(user) done(null, user)
      if(!user) done(null, false)
    })
  })
