import mongoose from 'mongoose';

/**
 * Facebook Schema
 */
const FacebookSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  screenId: {
    type: Number
  },
  name: {
    type: String
  },
  imageUrl: {
    type: String
  },
  token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Facebook', FacebookSchema);
