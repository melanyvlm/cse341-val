const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// 🧩 Función para validar los datos del contacto
function validateContact(data) {
  const { firstName, lastName, email, favoriteColor, birthday } = data;
  if (!firstName || !lastName || !email) {
    return "First name, last name and email are required.";
  }
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  // Validar fecha (opcional)
  if (birthday && isNaN(Date.parse(birthday))) {
    return "Invalid birthday date format.";
  }
  return null; // sin errores
}

// 🟩 GET todos los contactos
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts", error: error.message });
  }
};

// 🟩 GET un contacto por ID
const getSingleContact = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid contact ID format.' });
    }

    const contact = await mongodb.getDb().db().collection('contacts').findOne({ _id: new ObjectId(userId) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact", error: error.message });
  }
};

// 🟦 POST crear contacto
const createContact = async (req, res) => {
  try {
    const validationError = validateContact(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created successfully", id: response.insertedId });
    } else {
      throw new Error("Failed to create contact");
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error: error.message });
  }
};

// 🟨 PUT actualizar contacto
const updateContact = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid contact ID format.' });
    }

    const validationError = validateContact(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db().collection('contacts').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedContact }
    );

    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found or no changes made." });
    }

    res.status(200).json({ message: "Contact updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error: error.message });
  }
};

// 🟥 DELETE eliminar contacto
const deleteContact = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid contact ID format.' });
    }

    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: new ObjectId(userId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
