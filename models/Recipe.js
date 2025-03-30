const mongoose = require('mongoose'); // Add this line

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  ingredients: [String],
  instructions: String,
  nutrition: Object
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
