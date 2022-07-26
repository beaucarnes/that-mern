exports = async function({ query, headers, body}, response) {
  
    // restaurantsPerPage, page, cuisine, name, zipcode
    
    let { restaurantsPerPage = 20, page = 0 } = query;
    
    let dbQuery = {};
    
    if (query.cuisine) {
      dbQuery = { cuisine: query.cuisine }
    } else if (query.zipcode) {
      dbQuery = { "address.zipcode": query.zipcode }
    } else if (query.name) {
      dbQuery = { $text: { $search: query.name } }
    }
    
    restaurantsPerPage = parseInt(restaurantsPerPage)
    page = parseInt(page)

    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants")
    
    let restaurantsList = await collection.find(dbQuery, {name: 1, address: 1, cuisine: 1}).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray();
    
    restaurantsList.forEach(restaurant => {
      restaurant._id = restaurant._id.toString()
    })
    
    const responseData = {
      restaurants: restaurantsList,
      page: page.toString(),
      query: query,
      entries_per_page: restaurantsPerPage
    }

    return  responseData;
};
