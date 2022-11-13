const express = require('express')
const Users = require('../modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router()

router.post('/createuser',

    // validator syntax 
    body('name', 'enter again').isLength({ min: 5 }),
    body('email', 'enter again').isEmail(),
    body('password', 'enter again').isLength({ min: 5 }),

    async (req, res) => {
        console.log(req.body);

        // validating the details 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // let Fuser = new Users(req.body)
        // Fuser.save()
        // res.send(req.body)
        // OR

        try {
            let users = await Users.findOne({ email: req.body.email })
            if (users) {
                return res.status(400).json({ err: "Sorry a user with this email already exits" })
            }

            // hashing the passsword to avoid hackers 
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt);
            console.log(hashPass);

            // creating users document/row or data 
            users = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
            })
            res.json(users);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("some error occur")
        }
        // .then(user => res.json(user)).
        // catch(err=>{
        //     console.log(err)
        //     res.json({error:'please enter valid inputs'})
        // });

    }
)

module.exports = router;