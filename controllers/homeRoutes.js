const router = require("express").Router();
const { Product, User, Image } = require('../models');

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'name', 'price', 'create_at'],
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirtect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirtect('/');
        return;
    }

    res.render('signup');
})

router.get('/product/:id', (req, res) => {
    
    res.render('product', {});
});

module.exports = router;