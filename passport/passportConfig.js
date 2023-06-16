const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const db = require('../db')
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (passport) => {

  passport.use(new LocalStrategy (async (username, password, done) => {
    try{
      const user = await User.findByUsername(username)
      if(!user) {return done(null, false, {message: "User not found"})}
      const matchFound = await bcrypt.compare(password, user.password)
      if (!matchFound) {return done(null, false, { message: 'incorrect password'})}
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }))
  
  
  passport.serializeUser((user,done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser(async (id, done) => {
    try{
      const user = await User.findById(id)
      return done(null, user)
    } catch (err){
      return done(err)
    }
  })

}

