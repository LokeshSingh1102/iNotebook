const express = require('express')
const Users = require('../modules/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()

router.post('/',
    body('name', 'enter again').isLength({ min: 5 }),
    body('email', 'enter again').isEmail(),
    body('password', 'enter again').isLength({ min: 5 }),

    (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // let Fuser = new Users(req.body)
        // Fuser.save()
        // res.send(req.body)
        // OR
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).
        catch(err=>{
            console.log(err)
            res.json({error:'please enter valid inputs'})
        });
    }
)

module.exports = router;