const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Get all contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Post a contact
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      await newContact.save();
      res.json(newContact);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);

// Update a contact
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const updatedContact = {};

  if (name) updatedContact.name = name;
  if (phone) updatedContact.phone = phone;
  if (email) updatedContact.email = email;
  if (type) updatedContact.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found!' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedContact,
      },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete a contact
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    contact = await Contact.findByIdAndDelete(req.params.id);

    res.json({});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
