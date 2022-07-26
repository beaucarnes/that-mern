import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useLocation } from "react-router-dom";

const EditRestaurant = props => {
  let initialRestaurantState = {
      name: "",
      cuisine: "",
      address: {
        building: "",
        street: "",
        zipcode: ""}
  }

  let editing = false;
  const location = useLocation()

  if (location.state) {
    editing = true;
    initialRestaurantState = location.state.restaurant
  }

  const [name, setName] = useState(initialRestaurantState.name);
  const [cuisine, setCuisine] = useState(initialRestaurantState.cuisine);
  const [building, setBuilding] = useState(initialRestaurantState.address.building);
  const [street, setStreet] = useState(initialRestaurantState.address.street);
  const [zipcode, setZipcode] = useState(initialRestaurantState.address.zipcode);
  const [submitted, setSubmitted] = useState(false);

  const saveRestaurant = () => {
    var data = {
      name: name,
      building: building, 
      street: street, 
      zipcode: zipcode,
      cuisine: cuisine
    };

    if (editing) {
      const restaurantId = location.state.restaurant._id.$oid

      RestaurantDataService.updateRestaurant(data, restaurantId)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createRestaurant(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>

      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/"} className="btn btn-success">
              Back to Restaurants
            </Link>
          </div>
        ) : (
          <div>
            <h2>{ editing ? "Edit" : "Create" } Restaurant</h2>
            <div className="form-group">
              <label htmlFor="description">Name</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                name="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Cusine</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={cuisine}
                onChange={(evt) => setCuisine(evt.target.value)}
                name="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Building</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={building}
                onChange={(evt) => setBuilding(evt.target.value)}
                name="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Street</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={street}
                onChange={(evt) => setStreet(evt.target.value)}
                name="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Zipcode</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={zipcode}
                onChange={(evt) => setZipcode(evt.target.value)}
                name="text"
              />
            </div>
            <button onClick={saveRestaurant} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default EditRestaurant;