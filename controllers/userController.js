const User  = require('../models/user');
const bcrypt = require("bcrypt");

const hashPassword = async(password, saltRounds) => {
  try{
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (e) {
    console.log(e)
  }
  throw new Error("Cannot generate hash");
}

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const userExist = await User.findByUsername(username)
    //console.log(userExist);
    if (userExist) {
      res.json({msg: "Username is taken."})
    } else {
      const saltRounds = process.env.SALTROUNDS || 10
      const hash = await hashPassword(password, saltRounds)
      const newUser = await User.register(username, hash)
      if(newUser){
        res.status(201).json(newUser)
      }
    }
  } catch(e) {
    res.json({error: e.message})
  }
}

exports.displayUserCaptions = async (req, res) => {
  const userId = req.user.id;
  try{
    const captions = await User.display(userId)
    if(captions){
      res.status(200).json(captions)
    }
    else {
      res.json({ message : "User has no captions" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
}