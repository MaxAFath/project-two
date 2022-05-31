const router = require('express').Router();
const { Image } = require('../../models');
const path = require('path');

router.get('/:id', (req, res) => {
    Image.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbImageData => {
        const fileName = path.resolve(__dirname + '/../../images/' + dbImageData.file_name);
        res.sendFile(fileName);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.post('/upload', (req, res) => {
    console.log(req.files);
    Image.create({
        file_name: req.files.upload.name,
        product_id: 1
    })
        .then(dbImageData => {
            const file = req.files.upload
            const fileName = path.resolve(__dirname + '/../../images/' + file.name)
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