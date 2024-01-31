import FileManager from "./file.manager.js"

export default class Messages extends FileManager {
  constructor(filename = "./src/databases/db.messages.json") {
    super(filename)
  }

  getMessages = async () => this.get()

  createMessage = async (user, message) => this.add({ user, message })
}