const router = require('express').Router();
const { Image } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Image.findAll()
      .then(dbImageData => res.json(dbImageData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', withAuth, (req, res) => {
    Image.create({
      image_text: req.body.image_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbImageData => res.json(dbImageData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbImageData => {
        if (!dbImageData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbImageData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;