import React, { useContext, useEffect } from 'react'
import noteContext from '../context/note/noteContext'
import Noteitems from './Noteitems';

const Note = () => {
    const fetchNote = useContext(noteContext)
    const { notes,getNote} = fetchNote;
    useEffect(()=>{
        getNote()
        // eslint-disable-next-line
    },[])

    return (

        <div className="container">
            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    //for now i am taking note.title as key but i will change it later
                    return <Noteitems note={note} key={note._id} />
                })
                }
            </div>
        </div>
    )
}

export default Note
