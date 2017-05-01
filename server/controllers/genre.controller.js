//  genre controller

import httpStatus from 'http-status';
import Genre from '../models/genre.model';
import APIError from '../helpers/APIError';
/**
 * Load genre and append to req.
 */
function load(req, res, next, id) {
  Genre.get(id)
    .then((genre) => {
      req.genre = genre; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get genre
 * @returns {genre}
 */
function get(req, res) {
  return res.json(req.genre);
}

/**
 * Create new genre
 * @property {string} req.body.name - The name of Genre.
 * @returns {Genre}
 */
function create(req, res, next) {
  const genre = new Genre({
    name: req.body.name
  });

  function saveIfUniq(err, name) {
    if (name) {
      const error = new APIError('Genre already exists', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    genre.save()
      .then(savedGenre => res.json(savedGenre))
      .catch(e => next(e));
    return false;
  }

  Genre.findOne({ name: genre.name }, saveIfUniq);
}

/**
 * Update existing genre
 * @property {string} req.body.username - The username of genre
 * @property {string} req.body.mobileNumber - The mobileNumber of genre
 * @returns {Genre}
 */
function update(req, res, next) {
  const genre = req.genre;

  genre.name = req.body.name;


  genre.save()
    .then(savedGenre => res.json(savedGenre))
    .catch(e => next(e));
}

/**
 * Get genre list.
 * @property {number} req.query.skip - Number of genre to be skipped.
 * @property {number} req.query.limit - Limit number of genre to be returned.
 * @returns {Genre[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Genre.list({ limit, skip })
    .then(genre => res.json(genre))
    .catch(e => next(e));
}

/**
 * Delete Genre
 * @returns {Genre}
 */
function remove(req, res, next) {
  const genre = req.genre;
  genre.remove()
    .then(deletedGenre => res.json(deletedGenre))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
