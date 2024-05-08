class mustVerifiedMiddleware {
  async handle(req, res, next) {
    
    if (!req.headers.user.emailVerifiedAt) {
      return res.status(403).json({status : false, message : 'Email is not verified' })
    }
    if(!req.headers.user.phoneVerifiedAt){
      return res.status(403).json({status : false, message : 'Phone number is not verified'})
    }
    next()
  }
}

module.exports = new mustVerifiedMiddleware();