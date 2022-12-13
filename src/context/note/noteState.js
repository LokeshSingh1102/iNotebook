import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const note = [];
    const [notes, setNotes] = useState(note);

    const getNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth')
            }
        })
        const result = await response.json()
        console.log(result);
        setNotes(result);

    }

    const addNote = async (newNote) => {
        console.log("note added");

        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MTU2YzA3MWZlNDM2ODE1MzI5NGU2In0sImlhdCI6MTY2ODQzNzg1OH0.zWmh5-DUM2Z8bFE9Wl3dm0wmtZu02XGotWS23o_MSLA'
            },
            body: JSON.stringify({
                "title": newNote.title,
                "description": newNote.description,
                "tag": "begining"
            })
        })
        const result = await response.json()
        console.log(result);

        setNotes(notes.concat(result));
        // concat returns the array whereas push updates the array . So push will not work here because the updation is the work for setNotes
        // setNotes(notes.push(note1));
    }
    const deleteNote = async (id) => {
        console.log("delete", id);

        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MTU2YzA3MWZlNDM2ODE1MzI5NGU2In0sImlhdCI6MTY2ODQzNzg1OH0.zWmh5-DUM2Z8bFE9Wl3dm0wmtZu02XGotWS23o_MSLA'
            }
        })
        const result = await response.json()
        console.log(result);

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }

    const updateNote = async (newNote) => {
        const response = await fetch(`${host}/api/notes/updatenotes/${newNote._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MTU2YzA3MWZlNDM2ODE1MzI5NGU2In0sImlhdCI6MTY2ODQzNzg1OH0.zWmh5-DUM2Z8bFE9Wl3dm0wmtZu02XGotWS23o_MSLA'
            },
            body: JSON.stringify({
                "title": newNote.etitle,
                "description": newNote.edescription,
                "tag": "begining"
            })
        })
        const result = await response.json()
        let note = JSON.parse(JSON.stringify(result));
        for (let i = 0; i < notes.length; i++) {
            if (notes._id === newNote._id) {
                note[i].title = newNote.etitle;
                note[i].description = newNote.edescription;
                break;

            }
        }

        setNotes(note)
        getNote() // it will run everytime update happens
    }

    return (
        //using this syntanx every component inside noteState component in App.js can access this state.
        <noteContext.Provider value={{ notes, addNote, deleteNote, getNote, updateNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;