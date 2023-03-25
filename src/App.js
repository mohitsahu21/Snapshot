import logo from './logo.svg';
import './App.css';
import AppContext, { Context } from './Components/Context';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Beaches from './Components/Beaches';
import Food from './Components/Food';
import Mountains from './Components/Mountains';
import Bird from './Components/Birds';

function App() {
  



  return (
    <BrowserRouter>
    <AppContext>
      <Routes>
            
            <Route path='/beaches' element={<Beaches/>} />
            <Route path='/mountains' element={<Mountains/>} />
            <Route path='/foods' element={<Food/>} />
            <Route path='/birds' element={<Bird/>} />
            

      </Routes>
       
    </AppContext>
    </BrowserRouter>
  );
}

export default App;
