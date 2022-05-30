const router = require('express').Router();

const apiRoutes = require('./api/');
const userRoutes = require('./UserRoutes.js');
const productRoutes = require('./ProductRoutes.js');
const imageRotues = require('./imageRoutes.js');

router.use('/', )
router.use('/Product', productRoutes);
router.use('/User', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;