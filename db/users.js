const bcrypt = require("bcrypt");

// users:
let records = [
  {
    id: 1,
    username: "sam",
    password: "codec@demy10",
  },
  {
    id: 2,
    username: "jill",
    password: "p@ssword123!",
  },
  {
    id: 3,
    username: 'ddd',
    password: 'd'
  }
];

function getNewId(arr){
  if (arr.length > 0){
    return arr[arr.length-1].id + 1
  } else {
    return 1
  }
}

const hashPassword = async(password, saltRounds) => {
  try{
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (e) {
    console.log(e)
  }
  return null;
}

exports.comparePassword = async(password,hash) => {
  try{
    const match = await bcrypt.compare(password, hash)
    return match
  } catch(e){
    throw new Error(e)
    return false;
  }
}

exports.createNewUser = async(user) => {
  const u = exports.findUser(user.username)
    if (u) {
      throw new Error('user already exists')
    }
    const hash = await hashPassword(user.password,10)
    const newU = {
      id: getNewId(records),
      username: user.username,
      password: hash,
    }
    records.push(newU)
    return newU
}

exports.findById = (id, cb) => {
  process.nextTick(function(){
    const idx = id -1
    if(records[idx]){
      return cb(null, records[idx])
    } else {
      cb(new Error(` User with ${id} does not exist`))
    }
  })
}

exports.findByUsername = (username, cb) => {
  for(let i = 0; i < records.length; i++) {
    if (records[i].username === username) {
      return cb(null, records[i])
    }
  }
  return cb(null, null)
}

exports.findUser = (username) => {
  for(let i = 0; i < records.length; i++) {
    if (records[i].username === username) {
      return records[i]
    }
  }
}