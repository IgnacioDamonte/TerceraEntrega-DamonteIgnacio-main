export default class TicketsService {
  constructor(dao) {
    this.dao = dao
  }

  createTicket = async (ticket) => this.dao.createTicket(ticket)
}