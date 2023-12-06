
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const path = require("path");
const app = express();

//Connect Database
connectDB();



app.use(bodyParser.json());


// Route to add a new restaurant
const addNewRestaurant = async (data) => {
  try {
    const newRestaurant = new Restaurant(data);
    await newRestaurant.save();
    console.log('Restaurant added successfully');
  } catch (err) {
    console.error('Error adding restaurant:', err.message);
  }
};

// Return an array of all restaurants for a specific page, given the number of items per page
// Optional parameter "borough" to filter results by a specific "borough" value
const getAllRestaurants = async (page, perPage, borough) => {
  try {
    const skip = (page - 1) * perPage;
    let query = {};

    if (borough) {
      query = { 'address.borough': borough };
    }

    const restaurants = await Restaurant.find(query)
      .sort({ restaurant_id: 1 })
      .skip(skip)
      .limit(perPage);

    return restaurants;
  } catch (err) {
    console.error('Error fetching restaurants:', err.message);
    return [];
  }
};

// Return a single restaurant object whose "_id" value matches the "Id" parameter
const getRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id);
    return restaurant;
  } catch (err) {
    console.error('Error fetching restaurant by ID:', err.message);
    return null;
  }
};

//.




//.

module.exports = {
  connectDB,
  addNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));