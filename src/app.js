import express from "express"
import mongoose from "mongoose"
import routerProducts from "./routes/products.router.js"
import routerCarts from "./routes/carts.router.js"
import routerViews from "./routes/views.router.js"
import routerSession from "./routes/session.router.js"
import handlebars from "express-handlebars"
import { messagesService } from "./services/index.js"
import __dirname from "./utils.js"
import cookieParser from "cookie-parser"
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import { Server } from "socket.io"
import { MONGO_URL, MONGO_DBNAME, PORT } from "./config/config.js"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"))


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initializePassport()
app.use(passport.initialize())

app.use("/api/session", routerSession)
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use("/", routerViews)

mongoose.connect(MONGO_URL, { dbName: MONGO_DBNAME })
  .then(() => {
    const httpServer = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
    const socketServer = new Server(httpServer)
    socketServer.on("connection", async socket => {
      socket.emit("messages", await messagesService.getMessages())
      socket.on("new-message", async ({ message, user }) => {
        await messagesService.createMessage(user, message)
        socketServer.emit("messages", await messagesService.getMessages())
      })
    })
  })
  .catch(e => {
    console.error(e)
  })