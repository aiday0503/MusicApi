import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import artistCtrl from '../controllers/artist.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/artist - Get list of artists */
  .get(artistCtrl.list)

  /** POST /api/artist - Create new artist */
  .post(validate(paramValidation.createArtist), artistCtrl.create);

router.route('/:artistId')
  /** GET /api/artists/:artistId - Get artist */
  .get(artistCtrl.get)
  // to add authentication...
  // .get(expressJwt({ secret: config.jwtSecret }), artistCtrl.get)

  /** PUT /api/artists/:artistId - Update artist */
  .put(validate(paramValidation.updateArtist), artistCtrl.update)

  /** DELETE /api/artists/:artistId - Delete artist */
  .delete(artistCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('artistId', artistCtrl.load);

export default router;
