const { Router } = require('express');
const userRouter = require('./v1/user.route');
const movieRouter = require('./v1/movie.route');
const { bookingRouter } = require('./v1/booking.route');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/movies', movieRouter);
apiRouter.use('/booking', bookingRouter);

apiRouter.use(errorHandler);

module.exports = apiRouter;