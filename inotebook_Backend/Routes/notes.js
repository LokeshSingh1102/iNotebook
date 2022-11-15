const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../modules/Notes')

//Route 1: fetching user motes using GET: localhost:5000/api/notes/fetchuser
router.get('/fetchuser', fetchuser, async (req, res) => {
    // using try catch in case if thier is an error 
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 2: Adding notes using POST: localhost:5000/api/notes/addnotes
router.post('/addnotes', fetchuser, [
    // validator syntax 
    body('title', 'enter proper title').isLength({ min: 5 }),
    body('description', 'write somethinmg').isLength({ min: 5 }),
],
    async (req, res) => {

        // validating the details 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // using try catch in case if thier is an error
        const { title, description, tag } = req.body;

        try {
            // creating a note 
            const notes = await Notes.create({
                user:req.user.id,
                title: title,
                description: description,
                tag: tag
            })

            res.json(notes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

module.exports = router;