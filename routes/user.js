const router = require('express').Router();
const { create, signin } = require('../controllers/userController');

router.post('/create', create);
router.post('/session', signin);

module.exports = router;