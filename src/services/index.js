import { Carts, Products, Users, Messages, Tickets } from "../dao/factory.js"
import CartsService from "./carts.services.js"
import ProductsService from "./products.services.js"
import UsersService from "./users.services.js"
import MessagesService from "./messages.services.js"
import TicketsService from "./tickets.services.js"

export const cartsService = new CartsService(new Carts())
export const productsService = new ProductsService(new Products())
export const usersService = new UsersService(new Users())
export const messagesService = new MessagesService(new Messages())
export const ticketsService = new TicketsService(new Tickets())