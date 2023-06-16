const express = require("express");
const passport = require('passport');
const userRouter = express.Router();
//const db = require('../db')
const userController = require('../controllers/userController');


userRouter.use(passport.initialize())
userRouter.use(passport.session())


//routes
userRouter.get('/login', (req, res) => {
  res.render('login')
})

userRouter.post('/login', 
passport.authenticate('local', {failureRedirect: '/login'}),
(req, res) => {
  res.redirect('profile')
})

userRouter.get('/profile', (req, res) => {
  res.render('profile', {user: req.user})
})

userRouter.get('/register', (req, res) => {
  res.render('register')
})

userRouter.post('/register', userController.register);

userRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err) return next(err)
  })
  res.redirect('/login')
})


module.exports = userRouter 