import { Router } from "express"
import { productsService, cartsService } from "../services/index.js"
import { getFindParameters } from "../middlewares/products.middlewares.js"
import passport from "passport"
import { PERSISTENCE } from "../config/config.js"

const router = Router()

const isLoggedIn = (req, res, next) => {
  if (req.cookies.jwtCookie) return res.redirect("/products")

  return next()
}

const auth = (req, res, next) => {
  if (req.cookies.jwtCookie) return next()

  return res.redirect("/login")
}

router.get("/products", auth, passport.authenticate("jwt", { session: false }), getFindParameters, async (req, res) => {
  try {
    const result = await productsService.getProducts(req?.queryFindParameters, req?.optionsPaginate)
    result.user = req.user?.user || {}
    if (result.status == 400) return res.status(result.status).send(result.message)
    return res.render("products", result)
  }
  catch (e) {
    console.error(e)
    return res.status(500).send("Server error")
  }
})

router.get("/products/:pid", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById(pid)
    if (!product) return res.status(400).send(product)
    product.user = req.user?.user
    res.render("product", product)
  }
  catch (e) {
    console.error("Error:", e)
    return res.status(500).send("Server error")
  }
})

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartsService.getCartById(cid)
    PERSISTENCE == "FILE" && (cart.products = await Promise.all(cart.products.map(async p => {
      const product = await productsService.getProductById(p.id)
      return {...p, product}
    })))
    
    res.render("cart", cart)
  }
  catch (e) {
    console.error("Error:", e)
    res.status(500).send("Server error")
  }
})

router.get("/", (req, res) => res.redirect("/login"))

router.get("/login", isLoggedIn, (req, res) => {
  return res.render("login", {})
})

router.get("/register", isLoggedIn, (req, res) => {
  return res.render("register", {})
})

router.get("/chat", (req, res) => {
  return res.render("chat", {})
})

export default router