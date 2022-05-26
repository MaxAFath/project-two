const router = require('express').Router();

const apiRoutes = require('./api/');
const userRoutes = require('./User.js');
const productRoutes = require('./Product.js');

router.use('/Product', productRoutes);
router.use('/User', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;