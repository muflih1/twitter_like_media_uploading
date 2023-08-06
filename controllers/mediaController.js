const Media = require("../models/Media");

const mediaController = {
  upload: async (req, res) => {
    try {
      const media = new Media({
        mediaUrl: process.env.SERVER_URL + "/media/" + req.file.filename,
        mediaType: req.file.mimetype,
        userId: req.user._id,
      });

      await media.save();

      const { _id } = media;

      res.status(200).json({
        mediaId: _id,
      });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ success: false, errro: "Media upload failed" });
    }
  },
  create: async (req, res) => {
    const { mediaId, altText, sensitiveMediaWarning } = req.body;
    try {
      if (!mediaId)
        return res
          .status(400)
          .json({ success: false, error: "Missing mediaId field" });

      await Media.findByIdAndUpdate(
        mediaId,
        {
          $set: {
            altText,
            sensitiveMediaWarning,
          },
        },
        { new: true }
      );
      res.status(200).end();
    } catch (errors) {
      console.log("errors: ", errors);
      res.status(500).json({ success: false, error: "Media update failed" });
    }
  },
};

module.exports = mediaController;
