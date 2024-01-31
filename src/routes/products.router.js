import { Router } from "express"
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import { getFindParameters } from "../middlewares/products.middlewares.js";
import { authorization } from "../middlewares/auth.middlewares.js";
import passport from "passport";

const router = Router();

router.get("/", getFindParameters, getProducts);

router.get("/:pid", getProductById);

router.post("/", passport.authenticate("jwt", { session: false }), authorization("admin"), addProduct);

router.put("/:pid", passport.authenticate("jwt", { session: false }), authorization("admin"), updateProduct);

router.delete("/:pid", passport.authenticate("jwt", { session: false }), authorization("admin"), deleteProduct);

export default router;
