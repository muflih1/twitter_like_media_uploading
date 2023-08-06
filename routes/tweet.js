const router = require('express').Router();
const tweetController = require('../controllers/tweetController');
const { auth } = require('../middlewares/auth');

router.post('/CreateTweet', auth, tweetController.create);
router.delete('/DeleteTweet', auth, tweetController.deleteAction);
router.get('/HomeTimeline', auth, tweetController.homeTimeline);
router.get('/UserTimeline', auth, tweetController.UserTimeline);

module.exports = router;