const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Authentication required" });
    jwt.verify(token, 'secret', async (err, data) => {
      if (err) return res.status(401).json({ message: 'Token is not valid' });
      const user = await User.findById(data.userId);
      req.user = user;
      next();
    })
  } else {
    res.status(401).json({ message: "Authentication required" });
  };
};