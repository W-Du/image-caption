const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require('../db')

module.exports = (passport) => {
  
  passport.use(new LocalStrategy(async(username, password, done) => {
    try{
      const user = db.users.findUser(username)
      if (!user) return done(null, false)
      const matchPassword = await db.users.comparePassword(password, user['password'])
      if (!matchPassword) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    } catch(e){
      return done(e)
    }
  }))
  
  passport.serializeUser((user,done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id,done) => {
    db.users.findById(id, (err, user) => {
      if (err) return done(err)
      return done(null, user)
    })
  })
}

