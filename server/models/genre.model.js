import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Genre Schema
 */
const GenreSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
GenreSchema.method({
});

/**
 * Statics
 */
GenreSchema.statics = {
  /**
   * Get genre
   * @param {ObjectId} id - The objectId of genre.
   * @returns {Promise<genre, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((genre) => {
        if (genre) {
          return genre;
        }
        const err = new APIError('No such genre exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List genre in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of genre to be skipped.
   * @param {number} limit - Limit number of genre to be returned.
   * @returns {Promise<genre[]>}
   */
    list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Genre', GenreSchema);
