const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, "secret", { expiresIn: "1h" });
    if (token) {
      resolve(token);
    } else {
      reject(new Error("Something went wrong"));
    }
  });
}

module.exports = {
  create: async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      const exists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });
      if (exists)
        return res
          .status(400)
          .json({ success: false, error: "User already exists." });
      if (usernameExists)
        return res
          .status(400)
          .json({ success: false, error: "username already taken." });
      const hash = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        username,
        email,
        password: hash,
      });
      await user.save();
      const token = await generateToken({ userId: user._id });
      res.status(201).json({ token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "User creation failed" });
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ success: false, error: "We coudn't find the account." });
      const compare = await bcrypt.compare(password, user.password);
      if (!compare)
        return res
          .status(400)
          .json({ success: false, error: "Wrong password" });
      const token = await generateToken({ userId: user._id });
      res.status(200).json({ token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Sign in failed" });
    }
  },
};
