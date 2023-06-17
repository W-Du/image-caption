const express = require('express')
const photoRouter = express.Router()
const photoController = require('../controllers/photoController')

//import middleware
const { isAdmin } = require('../passport/middleware')

photoRouter.get('/', photoController.getPhotos)
photoRouter.get('/:id', photoController.getPhotoById)
photoRouter.post('/', isAdmin, photoController.createPhoto)
photoRouter.put('/:id', isAdmin, photoController.updatePhoto)
photoRouter.delete('/:id', isAdmin, photoController.deletePhoto)

module.exports = photoRouter
