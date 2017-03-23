import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import User from '../models/user.model';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

function authenticate(name, pass, fn) {
    function afterUserCheck(err, user) {
        if (user) {
            /* when we add hash...
             hash(pass, user.salt, function (err, hash) {
             if (err) return fn(err);
             if (hash == user.hash) return fn(null, user);
             fn(new Error('invalid password'));
             });*/
            if (user.password === pass) {
                return fn(null, user);
            }
            return fn('invalid password');
        }
        return fn('cannot find user');
    }
    User.findOne({ username: name }, afterUserCheck);
}

function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
    function afterAuthen(err, user) {
        if (!err) {
            const token = jwt.sign({
                username: user.username
            }, config.jwtSecret);
            return res.json({
                token,
                username: user.username
            });
        }
        const error = new APIError(err, httpStatus.UNAUTHORIZED, true);
        return next(error);
}
  authenticate(req.body.username, req.body.password, afterAuthen);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
