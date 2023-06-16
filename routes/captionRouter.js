const express = require('express');
const captionRouter = express.Router();
const captionController = require('../controllers/captionController')

const {isAuthenticated, requireAuth} = require('../passport/middleware')

captionRouter.get('/', captionController.getCaptions)
captionRouter.get('/:id', captionController.getCaptionById)
captionRouter.post('/', requireAuth, captionController.createCaption)
captionRouter.put('/:id', requireAuth, captionController.updateCaption)
captionRouter.delete('/:id', requireAuth, captionController.deleteCaption)
captionRouter.get('/user/:userId', requireAuth, captionController.getCaptionByUser)

module.exports = captionRouter
