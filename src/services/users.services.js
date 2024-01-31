export default class UsersService {
  constructor(dao) {
    this.dao = dao
  }

  getUserById = async (id) => {
    const user = await this.dao.getUserById(id)
    return user
  }

  getUserByEmail = async (email) => {
    const user = await this.dao.getUserByEmail(email)
    return user
  }

  createUser = async (user) => {
    const newUser = await this.dao.createUser(user)
    return newUser
  }
}