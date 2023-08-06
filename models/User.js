const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  avatar: {
    mediaId: {
      type: Types.ObjectId,
      ref: 'Media',
      required: false,
    },
    defaultAvatar: {
      type: String,
      default: 'http://localhost:3050/media/default_profile.png',
    },
  },
  cover: {
    mediaId: {
      type: Types.ObjectId,
      ref: 'Media',
      required: false,
    },
  },
  dob: {
    day: {type: String},
    month: {type: String},
    year: {type: String},
  },
}, { timestamps: true });

module.exports = model('User', userSchema);