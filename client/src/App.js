import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// router components
import NavBar from './Components/NavBar';
import Menu from './Components/Menu/Menu';
import DrinkInfo from './Components/Menu/DrinkInfo';
import Checkout from './Components/Checkout/Checkout';

import './App.css';


function App() {
  const [cart, setCart] = useState({})

  const addToCart = (id, amount) => {
    console.log(cart)
    setCart({...cart, [id]: amount})
  }


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/checkout" element={<Checkout cart={cart} />}> </Route>
            <Route path="/menu" element={<Menu addToCart={addToCart} />}> </Route>
            <Route path="/menu/:drink_id" element={<DrinkInfo />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
