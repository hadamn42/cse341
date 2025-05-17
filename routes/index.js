const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hellow World');
});

router.use('/contacts', require('./contacts'));

module.exports = router;