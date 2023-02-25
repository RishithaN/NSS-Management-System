import './App.css';
import Contact from './Contact';
import Home from './Home';
import NavBar from './NavBar';
import Gallery from './Gallery';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return(

    <div className='App'>

      <Router>
      <NavBar />
      <Routes>
        <Route path='login' element={< Login />} />
        <Route path='gallery' element={< Gallery />} />
        <Route path='contact' element={< Contact />} />
        <Route path='/' element={< Home />} />
        
      </Routes>
    </Router>

    </div>


  );


  
}

export default App;
