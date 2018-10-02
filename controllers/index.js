const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/api/user', require('./users'));

module.exports = router;
