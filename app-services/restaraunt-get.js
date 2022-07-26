exports = function({ query, headers, body}, response) {
  
    const { id } = query

    const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants")

    return restaurants.find({"_id": BSON.ObjectId(id)}, {name: 1, cuisine: 1, address: 1});
};
