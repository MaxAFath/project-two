const router = require('express').Router();
const { Image } = require('../models');
const path = require('path');
const { dirname } = require('path');

router.use('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbImageData => {
        const fileName = path.resolve(__dirname+'/../images/' + dbImageData.file_name);
        res.sendFile(fileName);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})

module.exports = router;