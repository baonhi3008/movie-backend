const { Prisma } = require('@prisma/client');
// const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const Joi = require('joi');
const ApiError = require('../utils/apiError');
const HttpCode = require('../utils/httpCode');
const generateBaseResponse = require('../utils/baseResponse');

const errorHandler = (err, req, res, next) => {
  // A work around with error handler using instanceof with swtich
  // https://stackoverflow.com/a/54286277/12532459

  if (res.headersSent) {
    return next(err);
  }

  // If else error works for all
  if (err instanceof Joi.ValidationError) {
    res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message));
    return 0;
  }

  // This way works for PrismaClientKnownRequestError
  // If use this way, Joi Validation Error will not be catched
  switch (true) {
    case err instanceof Prisma.PrismaClientKnownRequestError: {
      res.status(HttpCode.BAD_REQUEST)
        .json(generateBaseResponse(null, err.message.split('\n').slice(-1)[0]));
      break;
    }
    case err instanceof ApiError: {
      res.status(err.status).json(generateBaseResponse(null, err.message));
      break;
    }
    case err instanceof Error: {
      res.status(HttpCode.INTERNAL_ERROR).json(generateBaseResponse(null, err.message));
      break;
    }
    case err instanceof Joi.ValidationError: {
      res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message));
      break;
    }
    default: {
      res.status(HttpCode.INTERNAL_ERROR).json(generateBaseResponse(null, 'Internal Server Error!'));
      break;
    }
  }

  return 0;
};
module.exports = errorHandler
