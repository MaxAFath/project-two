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

router.put('/:id', async (req, res) => {
    try {
        const dbProductData = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!dbProductData) {
            res.status(404).json({ message: 'Product not found' });
        } else if (req.session.user_id === dbProductData.user_id) {
            const dbUpdateData = await Product.update(req.body, {
                individualHooks: true,
                where: {
                    id: req.params.id
                }
            });
            res.json(dbUpdateData);
        } else {
            res.status(401).json({ message: 'You must be logged in to make these changes' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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