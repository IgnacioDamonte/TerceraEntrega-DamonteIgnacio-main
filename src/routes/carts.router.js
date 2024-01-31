import { Router } from "express"
import { addCart, deleteProductFromCart, deleteProducts, getCartById, purchaseCart, updateCartProducts, updateProductFromCart } from "../controllers/carts.controller.js"
import { authorization } from "../middlewares/auth.middlewares.js"
import passport from "passport"

const router = Router()

router.get("/:cid", getCartById)

router.post("/", addCart)
router.post("/:cid/purchase", passport.authenticate("jwt", { session: false }), purchaseCart)

router.put("/:cid", passport.authenticate("jwt", { session: false }), authorization("user"), updateCartProducts)

router.put("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), authorization("user"), updateProductFromCart)

router.delete("/:cid", passport.authenticate("jwt", { session: false }), authorization("user"), deleteProducts)

router.delete("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), authorization("user"), deleteProductFromCart)

export default router