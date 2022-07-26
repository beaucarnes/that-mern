exports = async function({ query, headers, body}, response) {

    const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    
    const cuisines = await restaurants.distinct("cuisine");

    return cuisines;
};