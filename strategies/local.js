const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const auth = require('../index')
const config = auth.config

module.exports = new LocalStrategy(function(username, password, done) {
    let user = {username, password}
    auth.login(user).then(user=> {
      if(user) done(null, user)
      if(!user) done(null, false)
    })
  })
