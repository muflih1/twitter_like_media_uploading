const { Schema, model } = require('mongoose');

const mediaSchema = new Schema({
  mediaCategory: {
    type: String,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
  },
  sensitiveMediaWarning: {
    type: [String],
    enum: ['adultContent', 'graphicViolence', 'other'],
  },
}, { timestamps: true });

module.exports = model('Media', mediaSchema);