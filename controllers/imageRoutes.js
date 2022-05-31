const router = require('express').Router();
const { Image } = require('../models');

router.use('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbImageData => {
        const file_url = '/images/' + dbImageData.file_name;
        res.sendFile(file_url);
    })
})

module.exports = router;