import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { BsFillBarChartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../store/cartSlice';

function NavBar() {
  const totalQuantity = useSelector(state => selectTotalQuantity(state));

  return (
    <div><nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link to="" className="navbar-brand" href="#"><BsFillBarChartFill /> Stock Bar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/menu" className="nav-link active" aria-current="page" href="#">Menu</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link active" aria-current="page" href="#">Cart</Link>
          </li>

        </ul>
        <form className="d-flex" role="search">
          <button className="btn btn-outline-success" type="submit">Cart: {totalQuantity}</button>
        </form>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default NavBar