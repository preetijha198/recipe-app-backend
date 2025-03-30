const mongoose = require('mongoose'); // Add this line

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
