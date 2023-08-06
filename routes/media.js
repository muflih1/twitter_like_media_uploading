const router = require('express').Router();
const mediaController = require('../controllers/mediaController');
const { auth } = require('../middlewares/auth');
const upload = require('../multer/multer');

router.post('/upload', auth, upload.single('media'), mediaController.upload);
router.post('/create', auth, mediaController.create);

module.exports = router;