const multer = require('multer');
const { generate } = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../media"));
  },
  filename: (req, file, cb) => {
    cb(null, generate() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;