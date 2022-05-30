const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const imageRotues = require('./imageRoutes.js');
const productRoutes = require('./productRoutes.js');

router.use('/user', userRoutes);
router.use('/image', imageRotues);
router.use('/product', productRoutes);
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;