const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/api/user', require('./users'));
router.use('/api/transaction', require('./transaction'));
router.use('/auth', require('./auth'));

module.exports = router;
