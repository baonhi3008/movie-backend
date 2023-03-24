const db = require('../config/db');
const ApiError = require('../utils/apiError');
const HttpCode = require('../utils/httpCode');

const getBookedSeatsOfMovie = async (movieId) => {
    const movie = await db.movie.findUniqueOrThrow({ where: { id: parseInt(movieId) } });
    if (movie===null){
        throw new ApiError(HttpCode.NOT_FOUND,"Not Found")
    }
    const result = db.booking
      .findMany({
        where: {
          movieId: parseInt(movieId),
        },
        select: {
          seat: true,
        },
      })
      const arrayResult = (await result).map((ticket)=> ticket.seat).sort()
      return arrayResult
    
  };
const bookSeat = async (movieId, userId, seats) => {
    const seatLength = seats.length
    const movie = await db.movie.findUniqueOrThrow
    ({
        where: { id: parseInt(movieId) },
      });
  
    if (seatLength > movie.seats) {
      throw new ApiError(HttpCode.BAD_REQUEST, 'Not enough seats');
    } else {
      const bookedSeat = await getBookedSeatsOfMovie (movie.id);
  
      const seatBooked = [];
      seats.forEach((seat) => {
        if (bookedSeat.includes(seat)) {
          seatBooked.push(seat);
        }
      });
      if (seatBooked.length !== 0) {
        throw new ApiError(HttpCode.BAD_REQUEST, `Seats are already booked: ${seatBooked}`);
      } else {
        const result = await db.booking.createMany({
          data: seats.map((seat) => ({
            userId,
            movieId: parseInt(movieId),
            seat,
          })),
        });
        const seatCount = result.count
  
        await db.movie.update({
          where:
          {
            id: parseInt(movieId),
          },
          data:
          {
            seats: movie.seats - seatCount,
          },
        });
  
        return result;
      }
    }
  };
  
module.exports = {getBookedSeatsOfMovie, bookSeat}