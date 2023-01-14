import { BrowserRouter, Routes, Route } from 'react-router-dom';


// router components
import NavBar from './Components/NavBar';
import Menu from './Components/Menu/Menu';
import DrinkInfo from './Components/Menu/DrinkInfo';
import Checkout from './Components/Checkout/Checkout';

import './App.css';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/checkout" element={<Checkout />}> </Route>
            <Route path="/menu" element={<Menu />}> </Route>
            <Route path="/menu/:drink_id" element={<DrinkInfo />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
