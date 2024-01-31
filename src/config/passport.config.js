import passport from "passport"
import local from "passport-local"
import GithubStrategy from "passport-github2"
import { cartsService, usersService } from "../services/index.js"
import passportJWT from "passport-jwt"
import CartModel from "../dao/mongo/models/carts.model.js"
import { isValidPassword, createHash, jwtSign, generateToken } from "../utils.js"

const LocalStrategy = local.Strategy
const JWTStrategy = passportJWT.Strategy

const initializePassport = () => {

  passport.use("register", new LocalStrategy({
    passReqToCallback: true,
    usernameField: "email"
  }, async (req, username, password, done) => {
    const { first_name, last_name, email, age, role } = req.body
    try {
      const user = await usersService.getUserByEmail(username)
      if (user) {
        console.log("User already exists")
        return done(null, false)
      }
      const cart = await cartsService.addCart([])

      const newUser = {
        first_name,
        last_name,
        email,
        age,
        role,
        cart: cart?._id || cart?.id || "",
        password: createHash(password)
      }

      const result = await usersService.createUser(newUser)
      return done(null, result)
    }
    catch (e) {
      return done("Errorr: " + e)
    }
  }))

  passport.use("login", new LocalStrategy({
    usernameField: "email"
  }, async (username, password, done) => {
    try {
      const user = await usersService.getUserByEmail(username)

      if (!user) {
        console.log("User doesn't exists")
        return done(null, false)
      }

      if (!isValidPassword(user, password)) {
        console.log("Incorrect password")
        return done(null, false)
      }

      const token = generateToken(user)
      user.token = token

      return done(null, user)
    }
    catch (e) {
      return done("Error: " + e)
    }
  }))

  passport.use("github", new GithubStrategy({
    clientID: "Iv1.1f6612b8149317a4",
    clientSecret: "9f7b79d7e1cf90e5222e9d83653116cb6def74f9",
    callbackURL: "http://127.0.0.1:8080/api/session/githubcallback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await usersService.getUserByEmail(profile._json.email)
      if (!user) {
        console.log("User doesn't exists, pass to register")

        const cart = await cartsService.addCart([])
        user = await usersService.createUser({
          first_name: profile._json.name,
          last_name: "",
          email: profile._json.email,
          age: null,
          password: "",
          cart: cart?._id || cart?.id || "",
          role: profile._json.email == "adminCoder@coder.com" ? "admin" : "user"
        })
      }
      const token = generateToken(user)
      user.token = token

      return done(null, user)
    }
    catch (e) {
      return done("Error: " + e)
    }
  }))

  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([req => req?.cookies?.jwtCookie ?? null]),
    secretOrKey: jwtSign
  }, (payload, done) => {
    done(null, payload)
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getUserById(id)
    done(null, user)
  })
}

export default initializePassport