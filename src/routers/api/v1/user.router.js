const userController = require('../../../controllers/user.controller')
const catchAsync = require('../../../utils/catchAsync')
const errorHandler = require('../../../middlewares/errorHandler')
const {generateValidationMiddleware}= require('../../../middlewares/validation')
const {bodySchemaForCreateUser} = require('../../../validationschema/user.schema')
const Router = require('express')
const router = Router()

router.post('/',generateValidationMiddleware(bodySchemaForCreateUser,'body'),catchAsync(userController.createUser))
router.use(errorHandler)

module.exports = router