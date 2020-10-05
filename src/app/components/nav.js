import React from "react";
import {   BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect }  from "react-router-dom";
const navBar = () => {

    return (
<nav id="sidebarMenu" className="mt-5 col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
        <div className="pt-2">

          <img src="https://i.pinimg.com/originals/aa/09/4e/aa094e259222167283e2f179a2dbdf01.jpg" width="100%"></img>
        </div>

        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item ">
              <Link className="nav-link text-white" to="/">
                <span data-feather="home"></span>
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Tasks">
                <span data-feather="file"></span>
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Employees">
                <span data-feather="shopping-cart"></span>
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Customers">
                <span data-feather="users"></span>
                Customers
              </Link>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <span data-feather="file-text"></span>
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <span data-feather="file-text"></span>
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <span data-feather="file-text"></span>
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>
    
    );
}

export default navBar;