const movieController = require('../../../controllers/movie.controller')
const catchAsync = require('../../../utils/catchAsync')
const errorHandler = require('../../../middlewares/errorHandler')
const Router = require('express')
const router = Router()

router.post('/',catchAsync(movieController.createMovies))
router.get('/',catchAsync(movieController.getMovies))

router.use(errorHandler)

module.exports = router