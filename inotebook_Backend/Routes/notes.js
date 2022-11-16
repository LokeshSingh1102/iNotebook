const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../modules/Notes')
var ObjectId = require('mongoose').Types.ObjectId;

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
                user: req.user.id,
                title: title,
                description: description,
                tag: tag
            })

            res.json(notes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    }
)


//Route 3: Updating notes using PUT: localhost:5000/api/notes/updatenotes/:id
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // using try catch in case if thier is an error
    try {
        // updating a note
        // new ObjectId(req.params.id) it is for type casting from the params we are getting a string value so, that's 
        // why we have to type cast 
        const note = await Notes.findById({ _id: new ObjectId(req.params.id)}) 
        console.log(note);

        // this check is for if we doesnot find the note 
        if (!note) {
            return res.status(400).send("Not Found!")
        }

        // this check is for if the user is accessing it's own note 
        if (note.user.toString() != req.user.id) { return res.status(400).send("Access Denied") }

        // here updateNote is updating the note but returning the previous note i donot know why it is happenning
        let updatedNote = await Notes.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, newNote);

        // So i again finding the updated note and displaying it 
        const updNote = await Notes.findById({ _id: new ObjectId(req.params.id)}) 

        res.json(updNote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 4: Deleting notes using DELETE: localhost:5000/api/notes/deletenotes/:id
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    // using try catch in case if thier is an error
    try {
        // deleting a note
        // new ObjectId(req.params.id) it is for type casting from the params we are getting a string value so, that's 
        // why we have to type cast 
        const note = await Notes.findById({ _id: new ObjectId(req.params.id)}) 
        console.log(note);

        // this check is for if we doesnot find the note 
        if (!note) {
            return res.status(400).send("Not Found!")
        }

        // this check is for if the user is accessing it's own note 
        if (note.user.toString() != req.user.id) { return res.status(400).send("Access Denied") }

        // here updateNote is updating the note but returning the previous note i donot know why it is happenning
        let updatedNote = await Notes.findByIdAndDelete({ _id: new ObjectId(req.params.id) });

        // So i again finding the updated note and displaying it 
        // const updNote = await Notes.findById({ _id: new ObjectId(req.params.id)}) 

        res.json(updatedNote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;