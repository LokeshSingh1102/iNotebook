import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'
import Noteitems from './Noteitems';

const Note = () => {
    const fetchNote = useContext(noteContext)
    const { notes, setNotes } = fetchNote;

    return (

        <div className="container">
            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitems note={note} />
                })
                }
            </div>
        </div>
    )
}

export default Note
