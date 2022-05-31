const router = require('express').Router();

const apiRoutes = require('./api/');
const imageRoutes = require('./imageRoutes.js');

router.use('/image', imageRoutes)
router.use('/api', apiRoutes);

module.exports = router;