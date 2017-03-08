const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = new LocalStrategy(function(username, password, done) {
    let user = {
      id: 'FAKE_ID'
    }
    done(null, user)
  })
