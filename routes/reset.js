const jwt = require('jwt-simple')
const moment = require('moment')
const auth = require('../index')
const config = auth.config

module.exports = function(req, res, next) {
  auth.reset(req, res, next).then((data)=> {
    if(data) {
      res.json({status: 'ok'})
    } else {
      res.status(500).json({error: 'illegal token'})
    }

  }).catch(function(err) {
    console.log(err)
    res.status(err.status || 500).json({error: err.message})
  })
}
