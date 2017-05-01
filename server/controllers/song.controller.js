//  song controller

import httpStatus from 'http-status';
import Song from '../models/song.model';
import APIError from '../helpers/APIError';
/**
 * Load songs and append to req.
 */
function load(req, res, next, id) {
  Song.get(id)
    .then((song) => {
      req.song = song; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get songs
 * @returns {Songs}
 */
function get(req, res) {
  return res.json(req.song);
}

/**
 * Create new song
 * @property {string} req.body.name - The name of Song.
 * @returns {User}
 */
function create(req, res, next) {
  const song = new Song({
    name: req.body.name
  });

  function saveIfUniq(err, name) {
    if (name) {
      const error = new APIError('Song already exists', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    song.save()
      .then(savedSong => res.json(savedSong))
      .catch(e => next(e));
    return false;
  }

  Song.findOne({ name: song.name }, saveIfUniq);
}

/**
 * Update existing song
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const song = req.song;

  song.name = req.body.name;


  song.save()
    .then(savedSong => res.json(savedSong))
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
  Song.list({ limit, skip })
    .then(song => res.json(song))
    .catch(e => next(e));
}

/**
 * Delete Song.
 * @returns {User}
 */
function remove(req, res, next) {
  const song = req.song;
  song.remove()
    .then(deletedSong => res.json(deletedSong))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
