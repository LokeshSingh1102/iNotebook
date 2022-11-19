import noteContext from "./noteContext";

const noteState = (props) => {
    const state = {
        "name":"lokesh",
        "color":"red"
    }

    return (
        //using this syntanx every component inside noteState component in App.js can access this state.
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}

export default noteState;