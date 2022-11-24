import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext'

const Noteitems = (props) => {
    const fetchNote = useContext(noteContext)
    const { deleteNote } = fetchNote;

    const { note } = props
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                    {/* the icons */}
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
