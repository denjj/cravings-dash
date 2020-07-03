const router = require('express').Router();
let Restaurant = require('../../models/restaurant.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Restaurant.find()
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Restaurant.findById(req.params.id)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;