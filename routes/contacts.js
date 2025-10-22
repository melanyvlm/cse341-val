const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Returns a list of all contacts.
 *       500:
 *         description: Server error.
 */
router.get("/", contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.get("/:id", contactsController.getSingleContact);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Melany
 *               lastName:
 *                 type: string
 *                 example: Valencia
 *               email:
 *                 type: string
 *                 example: melany@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: Lavender
 *               birthday:
 *                 type: string
 *                 example: 2001-04-20
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Melany
 *               lastName:
 *                 type: string
 *                 example: Valencia
 *               email:
 *                 type: string
 *                 example: melany.updated@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: Pink
 *               birthday:
 *                 type: string
 *                 example: 2001-04-20
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Validation or ID format error
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.put("/:id", contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
