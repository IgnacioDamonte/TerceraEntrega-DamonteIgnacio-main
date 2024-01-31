import FileManager from "./file.manager.js"

export default class Users extends FileManager {
  constructor(filename = "./src/databases/db.users.json") {
    super(filename)
  }

  getUserById = async (id) => this.getById(id)
  getUserByEmail = async (email) => {
    const users = await this.get()
    return users.find((u) => u.email === email)
  }

  createUser = async (user) => this.add(user)
}