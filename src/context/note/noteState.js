import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const note = [
        {
            "title": "myTitle1",
            "description": "this is note 1"
        },
        {
            "title": "myTitle2",
            "description": "this is note 2"
        },
        {
            "title": "myTitle3",
            "description": "this is note 3"
        },
        {
            "title": "myTitle4",
            "description": "this is note 4"
        },
        {
            "title": "myTitle5",
            "description": "this is note 5"
        },
    ]
    const [notes, setNotes] = useState(note);

    return (
        //using this syntanx every component inside noteState component in App.js can access this state.
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;