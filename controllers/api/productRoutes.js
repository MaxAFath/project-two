const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Product, Purchase, Image, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Product.findAll({
        include: [
            {
                model: Image,
                attributes: ['id', 'product_id']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Product.create({
        name: req.body.name,
        user_id: req.session.user_id,
        description: req.body.description,
        price: req.body.price
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/purchase/:id', withAuth, (req, res) => {
    Purchase.create({
        user_id: req.session.user_id,
        product_id: req.params.id
    }).then(dbPurchaseData => {
        if (!dbPurchaseData) {
            res.status(404).json({ message: 'Product not found' })
            return;
        }
        res.json(dbPurchaseData);
    })
        .catch(err => {
            console.log(err);
            console.log(400).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;