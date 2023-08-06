const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 250,
    },
    mediaEntities: [
      {
        mediaId: {
          type: Schema.Types.ObjectId,
          ref: "Media",
          required: false,
        },
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Tweet", tweetSchema);
