const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /contacts - Todos los contactos
router.get('/', contactsController.getAllContacts);

// GET /contacts/:id - Un contacto específico
router.get('/:id', contactsController.getSingleContact);

// Week 3

// POST create new contact
router.post('/', contactsController.createContact);

// PUT update existing contact
router.put('/:id', contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);


module.exports = router;