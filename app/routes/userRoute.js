const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/')
    // .get(userController.list)
    .post(userController.store);

router.route('/:name?')
    .get(userController.list)

// router.get('/', userController.list);
// router.post('/', userController.store);

router.route('/:id')
    .put(userController.update)
    .delete(userController.destroy);

module.exports = router;