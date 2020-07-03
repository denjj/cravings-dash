const router = require('express').Router();
let Cartitem = require('../../models/cartitem.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Cartitem.find()
        .then(cartitems => res.json(cartitems))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Cartitem.findById(req.params.id)
        .then(cartitem => res.json(cartitem))
        .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const image = req.body.image;
    const userid = req.body.userid;

    const newCartItem = new Cartitem({
        name,
        price,
        image,
        userid,
    });

    newCartItem.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    Cartitem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order Deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;