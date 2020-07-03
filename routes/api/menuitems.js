const router = require('express').Router();
let Menuitem = require('../../models/menuitem.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Menuitem.find()
        .then(menuitems => res.json(menuitems))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Menuitem.findById(req.params.id)
        .then(menuitem => res.json(menuitem))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;