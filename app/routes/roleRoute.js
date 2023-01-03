const router = require('express').Router();
const roleController = require('../controllers/roleController');

router.route('/')
    .get(roleController.list)
    .post(roleController.store);

// router.get('/', roleController.list);
// router.post('/', roleController.store);

router.route('/:id')
    .delete(roleController.destroy);

module.exports = router;