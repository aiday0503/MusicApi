import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Artist Schema
 */
const ArtistSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  password: {
    type: String
  },
  description: {
    default: {
      type: String
    },
    en: {
      type: String
    },
    ru: {
      type: String
    }
  },
  genre: {
    type: [Number]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loved: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  name: {
    default: {
      type: String
    },
    en: {
      type: String
    },
    ru: {
      type: String
    }
  },
  country: {
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
ArtistSchema.method({
});

/**
 * Statics
 */
ArtistSchema.statics = {
  /**
   * Get artist
   * @param {ObjectId} id - The objectId of artist.
   * @returns {Promise<Artist, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((artist) => {
        if (artist) {
          return artist;
        }
        const err = new APIError('No such artist exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List artists in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of artists to be skipped.
   * @param {number} limit - Limit number of artists to be returned.
   * @returns {Promise<Artist[]>}
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
 * @typedef Artist
 */
export default mongoose.model('Artist', ArtistSchema);
