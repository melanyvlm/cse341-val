const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET /contacts - Todos los contactos
router.get('/', contactsController.getAllContacts);

// GET /contacts/:id - Un contacto específico
router.get('/:id', contactsController.getSingleContact);

module.exports = router;