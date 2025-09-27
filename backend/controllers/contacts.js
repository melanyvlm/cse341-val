const mongodb = require('../db/connect');

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
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: require('mongodb').ObjectId(userId) });
    
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

module.exports = { getAllContacts, getSingleContact };