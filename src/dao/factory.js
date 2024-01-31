import { PERSISTENCE } from "../config/config.js"

export let Carts
export let Products
export let Users
export let Messages
export let Tickets

switch (PERSISTENCE) {
  case "MONGO":
    const { default: CartsMongo } = await import("./mongo/carts.mongo.js")
    const { default: ProductsMongo } = await import("./mongo/products.mongo.js")
    const { default: UsersMongo } = await import("./mongo/users.mongo.js")
    const { default: MessagesMongo } = await import("./mongo/messages.mongo.js")
    const { default: TicketsMongo } = await import("./mongo/tickets.mongo.js")
    Carts = CartsMongo
    Products = ProductsMongo
    Users = UsersMongo
    Messages = MessagesMongo
    Tickets = TicketsMongo
    break
  case "FILE":
    const { default: CartsFile } = await import("./file/carts.file.js")
    const { default: ProductsFile } = await import("./file/products.file.js")
    const { default: UsersFile } = await import("./file/users.file.js")
    const { default: MessagesFile } = await import("./file/messages.file.js")
    const { default: TicketsFile } = await import("./file/tickets.file.js")
    Carts = CartsFile
    Products = ProductsFile
    Users = UsersFile
    Messages = MessagesFile
    Tickets = TicketsFile
    break
  default:
    throw new Error("Persistence is not defined")
}