import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Album Schema
 */
const AlbumSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  artistId: {
    type: Number
  },
  songs: {
    type: Number
  },
  name: {
    type: String
  },
  genre: {
    type: [Number]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  played: {
    type: Number,
    default: 0
  },
  liked: {
    type: Number,
    default: 0
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
AlbumSchema.method({
});

/**
 * Statics
 */
AlbumSchema.statics = {
  /**
   * Get album
   * @param {ObjectId} id - The objectId of album.
   * @returns {Promise<album, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((album) => {
        if (album) {
          return album;
        }
        const err = new APIError('No such album exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List album in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of album to be skipped.
   * @param {number} limit - Limit number of album to be returned.
   * @returns {Promise<album[]>}
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
export default mongoose.model('Album', AlbumSchema);
