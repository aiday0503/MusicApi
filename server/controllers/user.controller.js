import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import APIError from '../helpers/APIError';
import config from '../../config/config';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  function saveIfUniq(err, userOrEmail) {
    if (userOrEmail) {
      const error = new APIError('Email Is Already Taken', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    user.save()
      .then((savedUser) => {
        const accessToken = jwt.sign({
          username: savedUser.email
        }, config.jwtSecret);
        return res.json({
          accessToken,
          user: savedUser
        });
      })
      .catch(e => next(e));
    return false;
  }

  User.findOne({ email: user.email }, saveIfUniq);
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  user.email = req.body.email;
  user.name = req.body.name;
  user.location = req.body.location;
  user.language = req.body.language;
  user.password = req.body.password;

  user.save()
    .then(savedUser => res.json(savedUser))
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
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
