const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

// Get the logged in user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Auth user and get token
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ error: 'Email or Password are incorrect' });
      }

      const comparePasswords = await bcrypt.compare(password, user.password);

      if (!comparePasswords) {
        return res
          .status(404)
          .json({ error: 'Email or Password are incorrect' });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => res.json({ token })
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
