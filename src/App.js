import './App.css';
import Contact from './Contact';
import Home from './Home';
import NavBar from './NavBar';
import Gallery from './Gallery';
import Login from './Login'
import Admin from './Admin'
import MeetUpload from './MeetUpload'
import MeetView from './MeetView'
import Units from './Units'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return(

    <div className='App'>

      <Router>
      <NavBar />
      <Routes>
        <Route path='/login' element={< Login />} />
        <Route path='/gallery' element={< Gallery />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/admin' element={< Admin />} />
        <Route path='/meet-upload' element={< MeetUpload />} />
        <Route path='/meet-view' element={< MeetView />} />
        <Route path='/units' element={< Units />} />
        <Route path='/' element={< Home />} />

        
      </Routes>
    </Router>

    </div>


  );


  
}

export default App;
