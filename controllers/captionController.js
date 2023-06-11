const Caption  = require('../models/caption')

const errorHandler = (res, error, id = null) => {
  if ( id !== null && error.message === 'No data returned from the query.') {
    const msg = `Cannot find caption with id ${id}`
    res.status(404).json({ error: msg})
  } else {
    res.status(500).json({ error: error.message})
  }
}

exports.getCaptions = async (req, res) => {
  try{
    const captions = await Caption.getAll()
    res.status(200).json(captions)
  } catch(err) {
    errorHandler(res,err)
  }
}

exports.getCaptionById = async (req, res) => {
  const { id } = req.params
  try {
    const caption = await Caption.getById(id) 
    res.status(200).json(caption)
  } catch(err) {
    errorHandler(res,err,id)
  }
}

exports.createCaption = async (req, res) => {
  const { photo_id, user_id, title, caption } = req.body
  try {
    const newCap = await Caption.create(photo_id, user_id, title, caption)
    res.status(201).json(newCap)
  } catch(err){
    errorHandler(res,err)
  }
}

exports.updateCaption = async (req, res) => {
  const { id } = req.params
  const { title, caption } = req.body
  try {
    const updatedCap = await Caption.update(id, title, caption)
    res.status(201).json(updatedCap)
  } catch (err) {
    errorHandler(res,err,id)
  }
}

exports.deleteCaption = async (req, res) => {
  const { id } = req.params
  try{
    const deletedCap = await Caption.getById(id)
    await Caption.delete(id)
    res.status(200).json(deletedCap)
  } catch(err){
    errorHandler(res,err,id)
  }
}