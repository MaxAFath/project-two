const router = require("express").Router();
const { Product, User, Image } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {});
});

router.get('/product', (req, res) => {
    res.render('product', {});
});

module.exports = router;