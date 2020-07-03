const router = require('express').Router();
let Tag = require('../../models/tag.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Tag.find()
        .then(tags => res.json(tags))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Tag.findById(req.params.id)
        .then(tag => res.json(tag))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;