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
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <div >
      <NoteState> {/* every component inside NoteState can access NoteState's state values */}
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Signup' element={<Signup />} />
          </Routes>
        </Router>
        {/* <h1>this is inotebook</h1> */}
      </NoteState>
    </div>
  );
}

export default App;
