import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import EditRestaurant from "./components/restaurant-edit";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants/edit"} className="nav-link">
              New Restaurant
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<RestaurantsList />} />
          <Route exact path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
          <Route path="/restaurants/edit" element={<EditRestaurant />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
