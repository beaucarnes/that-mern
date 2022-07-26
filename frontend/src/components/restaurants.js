import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useNavigate } from "react-router-dom";

const Restaurant = props => {
  const { id } = useParams()

  const initialRestaurantState = {
    id: id,
    name: "",
    address: {
      building: "",
      street: "",
      zipcode: ""},
    cuisine: "",
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const navigate = useNavigate()

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        console.log("!",response.data);       
        setRestaurant(response.data[0]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteRestaurant = () => {
    RestaurantDataService.deleteRestaurant(id)
      .then(response => {
        navigate("/");
      })
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  return (
    <div>
      <div>
        <h5>{restaurant.name}</h5>
        <p>
          <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
          <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
        </p>
        <p>
          <Link to={"/restaurants/edit"} state={{ restaurant: restaurant }} 
            className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
          <a onClick={() => deleteRestaurant()} className="btn btn-danger col-lg-5 mx-1 mb-1">Delete</a>
        </p>
      </div>
    </div>
  );
};

export default Restaurant;