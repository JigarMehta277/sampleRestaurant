
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const path = require("path");
const app = express();

//Connect Database
connectDB();


const {
  addNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
} = require('./controllers/RestaurantController');


app.use(bodyParser.json());


// Route to add a new restaurant
app.post('/api/restaurants', async (req, res) => {
  try {
    await addNewRestaurant(req.body);
    res.status(201).json({ message: 'Restaurant added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all restaurants with optional query parameters
app.get('/api/restaurants', async (req, res) => {
  try {
    const { page, perPage, borough } = req.query;
    const restaurants = await getAllRestaurants(Number(page), Number(perPage), borough);
    res.json(restaurants);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get a specific restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.json(restaurant);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//.
app.put('/api/restaurants/:id', async (req, res) => {
  try {
    const updatedRestaurant = await updateRestaurantById(req.body, req.params.id);
    if (!updatedRestaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
    } else {
      res.json({ message: 'Restaurant updated successfully' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a specific restaurant by ID
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    await deleteRestaurantById(req.params.id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



//.


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));