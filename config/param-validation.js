import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      password: Joi.string().required(),
      email: Joi.string().required()
      // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      // username: Joi.string().required(),
      email: Joi.string().required()
      // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  createArtist: {
    body: {
      name: Joi.string().required()
      // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/)
    }
  },
  updateArtist: {
    body: {
      // username: Joi.string().required(),
      name: Joi.string().required()
      // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  }

};
