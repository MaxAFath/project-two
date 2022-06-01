const router = require("express").Router();
const { Product, User, Image } = require('../models');

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'name', 'price', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Image,
                attributes: ['id', 'product_id']
            }
        ]
    })
        .then(dbProductData => {
            console.log(dbProductData);
            console.log(dbProductData.images);
            const products = dbProductData.map(product => product.get({ plain: true }));
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
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'description', 'created_at', 'price'],
        include: [
            {
                model: Image,
                attributes: ['id', 'file_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            const product = dbProductData.get({ plain: true });
            res.render('single-product', { product, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;