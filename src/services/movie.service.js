const db = require('../config/db');

const seedMovie = async(movies) => await db.movie.createMany({
    data: movies.map((movie)=>({
        id: parseInt(movie.id),
        title: movie.title,
        runtime: parseInt(movie.runtime),
        year: parseInt(movie.year),
        posterUrl: movie.posterUrl,
        seats: parseInt(process.env.SEATS_PER_MOVIE )
    }))
})
const getAllMovies = async() => await db.movie.findMany({})

module.exports = {
    seedMovie,
    getAllMovies
}
