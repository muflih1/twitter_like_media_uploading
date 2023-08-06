const Media = require("../models/Media");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

const tweetController = {
  create: async (req, res) => {
    const { mediaEntities, text } = req.body;
    try {
      if (!mediaEntities && !text)
        return res.status(400).json({
          success: false,
          error: "MediaId or TweetText field is required",
        });

      let tweetObj = {
        userId: req.user._id,
      };

      if (text) tweetObj.text = text;

      if (mediaEntities) tweetObj.mediaEntities = mediaEntities;

      if (!mediaEntities) {
        const exists = await Tweet.findOne({ text });

        if (exists)
          return res
            .status(400)
            .json({ success: false, error: "Whoops! You already said that." });
      }

      const tweet = new Tweet(tweetObj);

      await tweet.save();

      res.status(200).json({ tweet });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Tweet creation failed" });
    }
  },

  homeTimeline: async (req, res) => {
    try {
      const tweets = await Tweet.find({}).populate('userId');
      const tweetUserImage = await Promise.all(
        tweets.map(async (tweet) => {
          const user = await User.findById(tweet.userId.toString());
          const medias = await Promise.all(
            tweet.mediaEntities.map(async (item) => {
              const media = await Media.findById(item.mediaId).select('-userId -__v -_id');
              return media;
            })
          )
          let tweetWithUser = { tweet: tweet.toObject(), user: user.toObject(), medias: medias };
          return tweetWithUser;
        }),
      );
      res.status(200).json({ tweets: tweetUserImage });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: "Failed to get timeline" });
    }
  },

  UserTimeline: async (req, res) => {
    const { user } = req.query;
    try {
      if (!user) return res.status(400).json({ success: false, error: "Missing user_id field" });
      const tweets = await Tweet.find({ userId: user });
      const tweetUserImage = await Promise.all(
        tweets.map(async (tweet) => {
          const user = await User.findById(tweet.userId.toString());
          const medias = await Promise.all(
            tweet.mediaEntities.map(async (item) => {
              const media = await Media.findById(item.mediaId).select('-userId -__v -_id');
              return media;
            })
          )
          let tweetWithUser = { tweet: tweet.toObject(), user: user.toObject(), medias: medias };
          return tweetWithUser;
        }),
      );
      res.status(200).json({ tweets: tweetUserImage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Failed" })
    }
  },

  deleteAction: async (req, res) => {
    const { tweetId } = req.body;
    try {
      if (!tweetId) {
        return res
          .status(400)
          .json({ success: false, error: "Missing tweetId field" });
      }
      const tweet = await Tweet.findById(tweetId);
      if (tweet.userId === req.user._id) {
        await tweet.deleteOne();
        res.status(200).end();
      } else {
        res.status(402).json({ success: false, error: "unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Tweet deletion failed" });
    }
  },
};

module.exports = tweetController;
