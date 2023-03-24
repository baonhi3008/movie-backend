const bookingService = require('../services/booking.service')
const generateBaseResponse = require('../utils/baseResponse');

const getMoviesWithSeat = async (req,res) => {
    const {movieId} = req.params
    console.log(req.param)
    const result  = await bookingService.getBookedSeatsOfMovie(movieId) 
    console.log(result)
    
    res.json(generateBaseResponse(`Seat Already Booked: ${result}`))
}
const bookMovie = async (req,res) =>{
    const {movieId,userId,seats} = req.body 
    console.log(req.body)
    const result = await bookingService.bookSeat(movieId,userId,seats)
    res.json(generateBaseResponse(result))
}
module.exports = {getMoviesWithSeat,bookMovie}