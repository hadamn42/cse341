const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //db() allows us to put in the database right there (which may have been my problem on the other one)
    //.collection specifies which collection we're working with (also my issue earlier)
    const result = await mongodb.getDatabase().db('contact').collection('contact').find();
    result.toArray().then((contactees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactees);
    });
};

const getSingle = async(req, res) => {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db('contact').collection('contact').find({ _id: contactId });
    result.toArray().then((contactees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactees[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};