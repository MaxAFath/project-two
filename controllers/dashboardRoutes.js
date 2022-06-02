const withAuth = require('../utils/auth');
const router = require('express').Router();
const { Product, Purchase } = require('../models');

router.get('/', withAuth, async (req, res) => {
    const dbProductData = Product.findAll({
        where: {
            user_id: req.session.user_id
        }
    });

    const dbPurchaseData = Purchase.findAll({
        where: {
            user_id: req.session.user_id
        }
    });

    const products = dbPostData.map(product => product.get({ plain: true }));
    const purchases = dbPostData.map(purchase => purchase.get({ plain: true }));

    res.render('dashboard', { products, purchases, loggedIn: req.session.loggedIn });
});

module.exports = router;