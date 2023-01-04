const router = require('express').Router();
const {
  getUsers,
  createUser,
  findSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(findSingleUser)
  .delete(deleteUser)
  .put(updateUser)

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)

router
  .route('/:userId/friends/:friendId')
  .delete(removeFriend)
  

module.exports = router;
