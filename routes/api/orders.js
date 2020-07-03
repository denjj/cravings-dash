const router = require('express').Router();
const auth = require('../../middleware/auth');
let Order = require('../../models/order.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post(auth,(req, res) => {
    const username = req.body.username;
    const items = req.body.items;
    const shipped = Boolean(req.body.shipped);
    const totalPrice = Number(req.body.totalPrice);
    const date = Date.parse(req.body.date);

    const newOrder = new Order({
        username,
        items,
        shipped,
        totalPrice,
        date,
    });

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete(auth, (req, res) =>{
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order Deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req, res) =>{
    Order.findById(req.params.id)
        .then(order => {
            order.username = req.body.username;
            order.items = req.body.items;
            order.shipped = Boolean(req.body.shipped);
            order.totalPrice = Number(req.body.totalPrice);
            order.date = Date.parse(req.body.date);

            order.save()
                .then(() => res.json('Order Updated.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;