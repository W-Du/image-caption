const express = require('express');
const captionRouter = express.Router();
const captionController = require('../controllers/captionController')

const isAuthenticated = require('../passport/middleware')

captionRouter.get('/', captionController.getCaptions)
captionRouter.get('/:id', captionController.getCaptionById)
captionRouter.post('/', isAuthenticated, captionController.createCaption)
captionRouter.put('/:id', isAuthenticated, captionController.updateCaption)
captionRouter.delete('/:id', isAuthenticated, captionController.deleteCaption)

module.exports = captionRouter
