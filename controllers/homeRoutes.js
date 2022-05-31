const router = require("express").Router();
const { Product, User, Image } = require('../models');

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'name', 'create_at'],
        order: [['created_at', 'DESC']],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbPorductData => {
        const products = dbPorductData.map(product => product.get({ plain: true }));
        res.render('homepage', { products, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/product', (req, res) => {
    res.render('product', {});
});

module.exports = router;