const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');

dotenv.config();

router.post('/', async (req, res) => {
    try {
      const { title, image, summary, ingredients, instructions, nutrition } = req.body;
  
      const newRecipe = new Recipe({ title, image, summary, ingredients, instructions, nutrition });
      await newRecipe.save();
  
      res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
    } catch (error) {
      res.status(500).json({ message: "Error adding recipe", error });
    }
  });
  

// ✅ Get all recipes from MongoDB
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// 🔍 Search recipes using Spoonacular API
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// ✅ Save a recipe to MongoDB
router.post('/save', async (req, res) => {
  try {
    const { title, image, summary, ingredients, instructions, nutrition } = req.body;

    // Create a new recipe
    const recipe = new Recipe({ title, image, summary, ingredients, instructions, nutrition });
    await recipe.save();

    res.json({ message: 'Recipe saved successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe', error });
  }
});

// ✅ Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
});

module.exports = router;

