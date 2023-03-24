const movieService = require('../services/movie.service');
const generateBaseResponse = require('../utils/baseResponse');

const createMovies = async (req, res) => {
  const movies = req.body;
  const result = await movieService.seedMovie(movies);
  res.json(generateBaseResponse(`${result.count} movies created`));
};

const getMovies = async (req, res) => {
  const movies = await movieService.getAllMovies();
  res.json(generateBaseResponse(movies));
};

module.exports = {
  createMovies,
  getMovies,
};