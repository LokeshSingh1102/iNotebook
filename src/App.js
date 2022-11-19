import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';

import NoteState from './context/note/noteState';

function App() {
  return (
    <div >      
      <NoteState> {/* every component inside NoteState can access NoteState's state values */}
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/About' element={<About />} />
          </Routes>
        </Router>
        {/* <h1>this is inotebook</h1> */}
      </NoteState>
    </div>
  );
}

export default App;
