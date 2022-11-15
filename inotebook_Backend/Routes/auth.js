const express = require('express')
const Users = require('../modules/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "lokesh"; // it should not be in the code either in some config file or in .env.local 


//Route 1: creating a user using post localhost:5000/api/auth/createuser. Sign up
router.post('/createuser', [


    // validator syntax 
    body('name', 'enter again').isLength({ min: 5 }),
    body('email', 'enter again').isEmail(),
    body('password', 'enter again').isLength({ min: 5 }),
],
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

            // providing a token for better security 
            const data = {
                user: {
                    id: users.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.json({ token: token });

            // res.json(users);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }

    }
)

//Route 2: Authenticate a user using post localhost:5000/api/auth/login. Log in
router.post('/login', [

    // validator syntax 
    body('email', 'enter again').isEmail(),
    body('password', 'enter password').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await Users.findOne({ email: email })
            if (!user) {
                return res.status(400).json("enter correct credentials")
            }

            // comparing password with user entered password 
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return res.status(400).json("enter correct credentials")
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(payload, JWT_SECRET)
            res.json({ authtoken: authtoken });

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
)

// Route 3: Get logged in usreinfo using post localhost:5000/api/auth/getuser. login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userid = req.user.id

        let users = await Users.findById(userid).select("-password");
        res.status(200).send(users);

        // res.json(users);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

}
)

module.exports = router;