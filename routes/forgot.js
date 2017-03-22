const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  auth.forgot(req, res, next).then((data)=> {
    res.json({status: 'ok'})
  }).catch(function(err) {
    console.log(err)
    res.status(err.status || 500).json({error: err.message})
  })
}
