import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  phoneNumber: { 
    type: String, 
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  location: {
    type: String
  }
  
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User