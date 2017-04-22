import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Playlist Schema
 */
const PlaylistSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  userId: {
    type: Number
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  private: {
    type: Boolean,
    default: false
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
  cover: {
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
PlaylistSchema.method({
});

/**
 * Statics
 */
PlaylistSchema.statics = {
  /**
   * Get playlist
   * @param {ObjectId} id - The objectId of playlist.
   * @returns {Promise<playlist, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((playlist) => {
        if (playlist) {
          return playlist;
        }
        const err = new APIError('No such playlist exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List playlist in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of playlist to be skipped.
   * @param {number} limit - Limit number of playlist to be returned.
   * @returns {Promise<playlist[]>}
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
export default mongoose.model('Playlist', PlaylistSchema);
