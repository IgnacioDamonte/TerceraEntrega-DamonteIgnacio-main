export default class MessagesService {
  constructor(dao) {
    this.dao = dao
  }

  getMessages = async () => await this.dao.getMessages()
  createMessage = async (user, message) => await this.dao.createMessage(user, message)

}