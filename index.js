
class Auth {
  set loginFunction(login) {
    this.login = login
  }
  set registerFunction(register) {
    this.register = register
  }
  set socialFunction(social) {
    this.social = social
  }
  set config(json) {
    this.configuration = json
  }
  get config() {
    return this.configuration
  }
  routes() {
    return require('./router')()
  }
}
module.exports = new Auth()
