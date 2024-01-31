import mongoose from "mongoose";

const usersCollection = "users";
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
  role: {type: String, default: "user"}
})

const userModel = mongoose.model(usersCollection,userSchema)

export default userModel