const router = require('express').Router();

// router.get('/', (req, res) => {res.send('Hellow World');});

router.use('/contacts', require('./contacts'));

module.exports = router;