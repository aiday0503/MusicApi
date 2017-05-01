//  album controller

import httpStatus from 'http-status';
import Album from '../models/album.model';
import APIError from '../helpers/APIError';
/**
 * Load album and append to req.
 */
function load(req, res, next, id) {
  Album.get(id)
    .then((album) => {
      req.album = album; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get albums
 * @returns {Albums}
 */
function get(req, res) {
  return res.json(req.album);
}

/**
 * Create new album
 * @property {string} req.body.name - The name of Album.
 * @returns {Album}
 */
function create(req, res, next) {
  const album = new Album({
    name: req.body.name
  });

  function saveIfUniq(err, name) {
    if (name) {
      const error = new APIError('Album already exists', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    album.save()
      .then(savedAlbum => res.json(savedAlbum))
      .catch(e => next(e));
    return false;
  }

  Album.findOne({ name: album.name }, saveIfUniq);
}

/**
 * Update existing album
 * @property {string} req.body.username - The username of album.
 * @property {string} req.body.mobileNumber - The mobileNumber of album.
 * @returns {Album}
 */
function update(req, res, next) {
  const album = req.album;

  album.name = req.body.name;


  album.save()
    .then(savedAlbum => res.json(savedAlbum))
    .catch(e => next(e));
}

/**
 * Get album list.
 * @property {number} req.query.skip - Number of albums to be skipped.
 * @property {number} req.query.limit - Limit number of albums to be returned.
 * @returns {Album[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Album.list({ limit, skip })
    .then(album => res.json(album))
    .catch(e => next(e));
}

/**
 * Delete Album.
 * @returns {Album}
 */
function remove(req, res, next) {
  const album = req.album;
  album.remove()
    .then(deletedAlbum => res.json(deletedAlbum))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
