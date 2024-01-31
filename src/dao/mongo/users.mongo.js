import userModel from "./models/users.model.js"

export default class Users {
  constructor() { }

  getUserById = async (id) => userModel.findById(id).lean().exec()
  getUserByEmail = async (email) => userModel.findOne({ email }).lean().exec()

  createUser = async (user) => userModel.create(user)
}