const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Product.findAll()
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) =>{
    Product.create({
        product_text: req.body.product_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err =>{
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id',withAuth,(req,res) =>{
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData =>{
        if(!dbProductData){
            res.status(404).json({message:'No product found with this id'});
            return;
        }
        res.json(dbProductData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;