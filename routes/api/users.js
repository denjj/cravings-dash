const router = require('express').Router();
let User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// Used for account registration
//route('') explained at 27 mins in
router.post('/',(req, res)=>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields '});
    }

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                        .then(user =>{

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )

                        });
                })
            })
        })
});

router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
        .then(user => {
            user.preferences = req.body.preferences;

            
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(40).json('Error: ' + err));
        })
        .catch(err => res.status(2000).json('Error: ' + err));
});


module.exports = router;