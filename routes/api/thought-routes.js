const router = require('express').Router();
const {
  getThoughts,
  findSingleThought,
  createThought,
  deleteThought,
  updateThought,
  newReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .put(updateThought)
  .get(findSingleThought)
  .delete(deleteThought)

router
  .route('/:thoughtId/reactions')
  .post(newReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;
