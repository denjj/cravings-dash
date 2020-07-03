const router = require('express').Router();
let User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// Used for everything accuont related, except registration
//route('') explained at 27 mins in
router.post('/',(req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({msg: 'Please enter all fields '});
    }

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User Does not exists'});

            // Validate Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

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
                })
        })
});


router.get('/user', auth, (req, res)=> {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

// Modifies existing user model, finds by id
// TODO: Doesn't work with auth
// TODO: Can't change password yet due to storing as salt/hash in mongodb
router.put('/user', (req, res)=> {
    User.findByIdAndUpdate(req.body.id, req.body, {new: true})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

/* Simple api endpoint for debugging
router.get('/', (req, res)=> {
    User.findById(req.body.id)
    //User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});
*/

module.exports = router;