const Photo = require('../models/photo');

const errorHandler = (res, error, id = null) => {
  if ( id !== null && error.message === 'No data returned from the query.') {
    const msg = `Cannot find caption with id ${id}`
    res.status(404).json({ error: msg})
  } else {
    res.status(500).json({ error: error.message})
  }
}

exports.getPhotos = async (req, res) => {
  try{
    const photos = await Photo.getAll()
    //res.status(200).json(photos)
    res.render('photos', { user: req.user, photos: photos })
  } catch(err) {
    errorHandler(res,err)
  }
}

exports.getPhotoById = async (req, res) => {
  const { id } = req.params
  try{
    const photo = await Photo.getById(id)
    res.status(200).json(photo)
  } catch (err) {
    errorHandler(res,err,id)
  }
}

exports.createPhoto = async (req, res) => {
  const { url, name, description } = req.body
  try{
    const newPhoto = await Photo.create(url, name, description)
    res.status(201).json(newPhoto)
  } catch(err) {
    errorHandler(res,err)
  }
}

exports.updatePhoto = async (req, res) => {
  const { id } = req.params
  const { url, name, description } = req.body
  try{
    const updatedPhoto = await Photo.update(id, url, name, description)
    res.status(201).json(updatedPhoto)
  } catch(err) {
    errorHandler(res,err,id)
  }
}

exports.deletePhoto = async (req, res) => {
  const { id } = req.params
  try{
    const deletePhoto = await Photo.getById(id)
    await Photo.delete(id)
    res.status(200).json(deletePhoto)
  } catch(err) {
    errorHandler(res,err,id)
  }
}

