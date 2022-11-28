import React, { useContext, useState } from 'react'
import noteContext from '../context/note/noteContext'


const AddNote = () => {
    const title = document.getElementById("title")
    const description = document.getElementById("description")

    // to access addNote function using context api
    const fetchNote = useContext(noteContext)
    const { addNote } = fetchNote;

    const [notes, setNotes] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault(); //using this the will not reload

        // adding the updated notes 
        addNote(notes)

        // to make the input area empty after submitting 
        console.log(title.value);
        console.log(description.value);
        setNotes({ title: "", description: "", tag: "" })

    }

    // this function will take the input and update the notes state 
    const onchamge = (e) => {
        // here e is the Element which is changing
        setNotes({ ...notes, [e.target.name]: e.target.value }) // updating
    }
    return (
        <div className='my-3'>
            <h2>Add a Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchamge} value={notes.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onchamge} value={notes.description} />
                </div>
                <button disabled={notes.title < 5 || notes.description < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
