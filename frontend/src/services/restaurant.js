import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  } 

  createRestaurant(data) {
    return http.post("/restaurant", data);
  }

  updateRestaurant(data, id) {
    return http.put(`/restaurant?id=${id}`, data);
  }

  deleteRestaurant(id) {
    return http.delete(`/restaurant?id=${id}`);
  }

  getCuisines() {
    return http.get(`/cuisines`);
  }

}

export default new RestaurantDataService();