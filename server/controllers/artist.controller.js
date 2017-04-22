// artist controller

import httpStatus from 'http-status';
import Artist from '../models/artist.model';
import APIError from '../helpers/APIError';
/**
 * Load artist and append to req.
 */
function load(req, res, next, id) {
  Artist.get(id)
    .then((artist) => {
      req.artist = artist; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get artists
 * @returns {Artist}
 */
function get(req, res) {
  return res.json(req.artist);
}

/**
 * Create new user
 * @property {string} req.body.name - The name of Artist.
 * @returns {User}
 */
function create(req, res, next) {
  const artist = new Artist({
    name: req.body.name
  });

  function saveIfUniq(err, name) {
    if (name) {
      const error = new APIError('Artist already exists', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    artist.save()
      .then(savedArtist => res.json(savedArtist))
      .catch(e => next(e));
    return false;
  }

  Artist.findOne({ name: artist.name }, saveIfUniq);
}

/**
 * Update existing artist
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const artist = req.artist;

  artist.name = req.body.name;


  artist.save()
    .then(savedArtist => res.json(savedArtist))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Artist.list({ limit, skip })
    .then(artist => res.json(artist))
    .catch(e => next(e));
}

/**
 * Delete Artist.
 * @returns {User}
 */
function remove(req, res, next) {
  const artist = req.artist;
  artist.remove()
    .then(deletedArtist => res.json(deletedArtist))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
