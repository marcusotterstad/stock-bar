import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

// router components
import NavBar from './Components/NavBar';
import Menu from './Components/Menu/Menu';
import DrinkInfo from './Components/Menu/DrinkInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/menu" element={<Menu />}> </Route>
            <Route path="/menu/:drink_id" element={<DrinkInfo />}> </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
