const express = require('express');
const captionRouter = express.Router();
const captionController = require('../controllers/captionController')

const {requireAuth} = require('../passport/middleware')

captionRouter.get('/', captionController.getCaptions)
captionRouter.get('/:id', captionController.getCaptionById)
captionRouter.post('/', requireAuth, captionController.createCaption)
captionRouter.put('/:id', requireAuth, captionController.updateCaption)
captionRouter.delete('/:id', requireAuth, captionController.deleteCaption)
captionRouter.get('/user/:userId', requireAuth, captionController.getCaptionByUser)

module.exports = captionRouter


/**
 * @swagger
 * /caption/{id}:
 *    get:
 *      summary: Get an individual caption
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: id
 *          description: caption id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a caption
 *          example: {"id":16,"user_id":2,"photo_id":1,"title":"insert by bb","caption":"bbbbb"}
 *        "404":
 *          description: caption id not found
 *          example: {"error":"Cannot find caption with id 1"}
 */

/**
 * @swagger
 * /caption/user/{userId}:
 *    get:
 *      summary: Get captions made by an individual user 
 *      produces:
 *        - application/json
 *      tags:
 *        - Captions
 *      parameters:
 *        - name: userId
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns captions 
 *          example: [{"id":1,"photo":"cubs","title":"no","caption":"testing"},
 *                    {"id":4,"photo":"puffin","title":"hi","caption":"what?"}]
 *        "500":
 *          description: user not authorized
 *          example: {"error":"Unauthorized"}
 */
