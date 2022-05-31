const router = require("express").Router();
const { Product, User, Image } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {});
});

module.exports = router;