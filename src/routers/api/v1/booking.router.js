const bookingController = require('../../../controllers/booking.controller')
const catchAsync = require('../../../utils/catchAsync')
const errorHandler = require('../../../middlewares/errorHandler')
const Router = require('express')
const router = Router()

router.get('/:movieId/seats/',catchAsync(bookingController.getMoviesWithSeat))
router.post('/',catchAsync(bookingController.bookMovie))

router.use(errorHandler)

module.exports = router