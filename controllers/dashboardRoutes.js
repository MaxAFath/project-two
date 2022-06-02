const withAuth = require('../utils/auth');
const router = require('express').Router();
const { Product, Purchase, User, Image } = require('../models');

router.get('/', withAuth, async (req, res) => {
    const dbProductData = await Product.findAll({
        where: {
            user_id: req.session.user_id
        },
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
    });

    const dbPurchaseData = await Purchase.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Product,
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
            }
        ]
    });

    const products = dbProductData.map(product => product.get({ plain: true }));
    const purchases = dbPurchaseData.map(purchase => purchase.get({ plain: true }));

    res.render('dashboard', { products, purchases, loggedIn: req.session.loggedIn });
});

module.exports = router;