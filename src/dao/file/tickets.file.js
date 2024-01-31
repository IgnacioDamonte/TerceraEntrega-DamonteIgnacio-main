import FileManager from "./file.manager.js"

export default class Tickets extends FileManager {
  constructor(filename = "./src/databases/db.tickets.json") {
    super(filename)
  }

  createTicket = async (ticket) => this.add(ticket)
}