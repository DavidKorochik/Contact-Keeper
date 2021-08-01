const express = require('express');
const router = express.Router();

// Get all contacts
router.get('/', (req, res) => {
  res.send('Get all contacs');
});

// Post a contact
router.post('/', (req, res) => {
  res.send('add a contact');
});

// Update a contact
router.put('/:id', (req, res) => {
  res.send('update a contact');
});

// Delete a contact
router.delete('/:id', (req, res) => {
  res.send('delete a contact');
});

module.exports = router;
