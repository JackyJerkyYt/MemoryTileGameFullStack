import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Admin from './pages/Admin';
import Player from './pages/Player';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
 
  return (  
    <Router>
      <Routes>
        <Route path='/' element={<Player />}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </Router>
  );
}

export default App;
