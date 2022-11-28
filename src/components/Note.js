import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/note/noteContext'
import Noteitems from './Noteitems';

const Note = () => {

    const fetchNote = useContext(noteContext)
    const { notes, getNote, updateNote } = fetchNote;

    // after updating there has been am error notes.map was not working so,need to convert notes object to Array then used map function in arr 
    let arr = Array.from(notes)

    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [enote, setEnote] = useState({ _id: "", etitle: "", edescription: "" });


    const handleclick = (e) => {
        console.log("updating note", enote);
        updateNote(enote)
        refClose.current.click();

    }

    const onchamge = (e) => {
        // here e is the Element which is changing
        setEnote({ ...enote, [e.target.name]: e.target.value }) // updating the modal
    }

    const clickUpdate = (editNote) => {
        console.log(editNote._id);
        setEnote({ _id: editNote._id, etitle: editNote.title, edescription: editNote.description }) // to show value on modal
        ref.current.click();
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* modal form  */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchamge} value={enote.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onchamge} value={enote.edescription} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={enote.etitle < 5 || enote.edescription < 5} type="button" className="btn btn-primary" onClick={handleclick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <h2>Your Notes</h2>
                    {arr.map.length > 0 && arr.map((note) => {
                        //for now i am taking note.title as key but i will change it later
                        return <Noteitems note={note} update={clickUpdate} key={note._id} />
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default Note
