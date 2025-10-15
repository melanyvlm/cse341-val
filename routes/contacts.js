const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactsController.getSingleContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *     responses:
 *       204:
 *         description: Contact updated successfully
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
