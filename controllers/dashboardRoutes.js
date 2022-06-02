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

    
    res.render('dashboard', {});
});

module.exports = router;