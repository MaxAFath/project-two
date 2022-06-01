const router = require('express').Router();
const { Image } = require('../../models');
const path = require('path');

router.get('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbImageData => {
        const fileName = path.resolve(__dirname + '/../../images/' + dbImageData.id + '.' + dbImageData.file_type.split('/')[1]);
        res.sendFile(fileName);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.post('/upload', (req, res) => {
    Image.create({
        product_id: req.files.file.name.split('-')[1],
        file_type: req.files.file.mimetype
    })
        .then(dbImageData => {
            const file = req.files.file;
            const fileName = path.resolve(__dirname + '/../../images/' + dbImageData.id + '.' + req.files.file.mimetype.split('/')[1]);
            file.mv(fileName, err => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                res.json(dbImageData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
})

module.exports = router;