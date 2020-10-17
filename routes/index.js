const router = require('express').Router();

router.use('/api/users', require('./users'));

router.use('/api/messages', require('./messages'));


module.exports = router;