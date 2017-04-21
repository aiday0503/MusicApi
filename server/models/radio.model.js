import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Radio Schema
 */
const RadioSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  liked: {
    type: Number,
    default: 0
  },
  url: {
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
RadioSchema.method({
});

/**
 * Statics
 */
RadioSchema.statics = {
  /**
   * Get radio
   * @param {ObjectId} id - The objectId of radio.
   * @returns {Promise<radio, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((radio) => {
        if (radio) {
          return radio;
        }
        const err = new APIError('No such radio exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Radio', RadioSchema);
