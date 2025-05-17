const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //db() allows us to put in the database right there (which may have been my problem on the other one)
    //.collection specifies which collection we're working with (also my issue earlier)
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db('contact').collection('contact').find();
    result.toArray().then((contactees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactees);
    });
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db('contact').collection('contact').find({ _id: contactId });
    result.toArray().then((contactees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactees[0]);
    });
};

const createContact = async(req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('contact').collection('contact').insertOne(contact);
    if (response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while creating the contact.');
    }
};

const updateContact = async(req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new objectId(req.params.id); 
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('contact').collection('contact').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating the contact.');
    }   
};

const deleteContact = async(req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().db('contact').collection('contact').deleteOne({_id: contactId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while deleting the contact.');
    } 
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};