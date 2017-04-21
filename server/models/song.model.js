import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Song Schema
 */
const SongSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  artistId: {
    type: [Number]
  },
  title: {
    type: String
  },
  genre: {
    type: [Number]
  },
  albumId: {
    type: Number
  },
  lyrics: {
    type: String
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
  },
  download: {
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
SongSchema.method({
});

/**
 * Statics
 */
SongSchema.statics = {
  /**
   * Get song
   * @param {ObjectId} id - The objectId of song.
   * @returns {Promise<song, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((song) => {
        if (song) {
          return song;
        }
        const err = new APIError('No such song exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List song in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of song to be skipped.
   * @param {number} limit - Limit number of song to be returned.
   * @returns {Promise<song[]>}
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
export default mongoose.model('Song', SongSchema);
