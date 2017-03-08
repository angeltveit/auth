module.exports = function profile(req,res,next) {
  // Send user/profile
  res.json(req.user)
}
