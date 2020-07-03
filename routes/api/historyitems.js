const router = require('express').Router();
let Historyitem = require('../../models/historyitem.model');

//route('') explained at 27 mins in
router.get('/',(req, res)=>{
    Historyitem.find()
        .then(historyitems => res.json(historyitems))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) =>{
    Historyitem.findById(req.params.id)
        .then(historyitem => res.json(historyitem))
        .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const image = req.body.image;
    const userid = req.body.userid;
    const date = Date.parse(req.body.date);

    const newHistoryItem = new Historyitem({
        name,
        price,
        image,
        userid,
        date,
    });

    newHistoryItem.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    Historyitem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order Deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;