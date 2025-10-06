const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET todos los contactos
const getAllContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET un contacto por ID
const getSingleContact = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await mongodb.getDb().db().collection('contacts').findOne({
      _id: new ObjectId(userId)
    });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Week 3 
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .updateOne({ _id: userId }, { $set: contact }); // <-- clave: $set

    if (response.modifiedCount > 0) {
      res.status(204).send(); // éxito
    } else {
      res.status(404).json({ error: "No se encontró el contacto o no se modificó." });
    }
  } catch (error) {
    console.error("🔥 Error en updateContact:", error);
    res.status(500).json({ error: error.message });
  }
};



const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};
module.exports = {
  getAllContacts, getSingleContact, createContact,
  updateContact,
  deleteContact
};