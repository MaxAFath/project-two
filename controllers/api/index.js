const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const imageRoutes = require('./imageRoutes.js');
const productRoutes = require('./productRoutes.js');

router.use('/users', userRoutes);
router.use('/images', imageRoutes);
router.use('/products', productRoutes);

module.exports = router;