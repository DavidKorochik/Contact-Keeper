const express = require('express');
const router = express.Router();

// Get the logged in user
router.get('/', (req, res) => {
  res.send('The logged in user is David');
});

// Auth user and get token
router.post('/', (req, res) => {
  res.send('log in user');
});

module.exports = router;
