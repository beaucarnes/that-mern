exports = async function({ query, headers, body}, response) {
  
    const { id } = query
    
    let data = {}
    
    if (body) {
      data = JSON.parse(body.text())
    }

    const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants")

    
    
    switch(context.request.httpMethod) {
      case "GET":
        return restaurants.find({"_id": BSON.ObjectId(id)}, {name: 1, cuisine: 1, address: 1});
      case "POST":
        if (data) {
          const restaurantDoc = {
            name: data.name,
            cuisine: data.cuisine,
            address: {building: data.building, street: data.street, zipcode: data.zipcode}
          }
          
          try {
            const { insertedID } = await restaurants.insertOne(restaurantDoc);
            
            response.setStatusCode(200)
            response.setBody(`Success! Created document with _id: ${insertedID}.`)
          } catch (err) {
            response.setStatusCode(500)
            response.setBody(`Failed! Error: ${err}.`)            
          }
        }
        break;
      case "PUT":
        if (data && id) {
          const restaurantDoc = {
            name: data.name,
            cuisine: data.cuisine,
            address: {building: data.building, street: data.street, zipcode: data.zipcode}
          }
          
          try {
            await restaurants.updateOne(
              { "_id": BSON.ObjectId(id) },
              { $set: restaurantDoc}
            );
            
            response.setStatusCode(200)
            response.setBody(`Success! Updated document.`)
          } catch (err) {
            response.setStatusCode(500)
            response.setBody(`Failed! Error: ${err}.`)            
          }
        }
        break;   
      case "DELETE":
        if (id) {
          try {
            await restaurants.deleteOne({ "_id": BSON.ObjectId(id) });
            
            response.setStatusCode(200)
            response.setBody(`Success! Deleted document.`)
          } catch (err) {
            response.setStatusCode(500)
            response.setBody(`Failed! Error: ${err}.`)            
          }
        }
    }
    
    return {}; 
};
