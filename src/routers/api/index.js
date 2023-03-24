const { Router } = require('express');
const userRouter = require('./v1/user.router');
const movieRouter = require('./v1/movie.router');
const bookingRouter = require('./v1/booking.router');

const errorHandler = require('../../middlewares/errorHandler');

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/movies', movieRouter);
apiRouter.use('/booking', bookingRouter);

apiRouter.use(errorHandler);

module.exports = apiRouter;
