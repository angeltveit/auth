
class Auth {
  set loginFunction(login) {
    this.login = login
  }
  set registerFunction(register) {
    this.register = register
  }
  routes(app) {
    return require('./router')(app)
  }
}
module.exports = new Auth()
