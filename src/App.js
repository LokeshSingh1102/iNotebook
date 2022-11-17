import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/About' element={<About/>} />
        </Routes>
      </Router>
      {/* <h1>this is inotebook</h1> */}
    </div>
  );
}

export default App;
