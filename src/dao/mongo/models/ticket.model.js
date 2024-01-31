import mongoose from "mongoose"
import crypto from "crypto"

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
  code: { type: String, default: crypto.randomBytes(20).toString("hex") },
  purchase_datetime: Date,
  amount: Number,
  purchaser: String
})

export default mongoose.model(ticketsCollection, ticketSchema)