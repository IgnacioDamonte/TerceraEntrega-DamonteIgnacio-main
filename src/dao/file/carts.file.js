import FileManager from "./file.manager.js"

export default class Carts extends FileManager {
  constructor(filename = "./src/databases/db.carts.json") {
    super(filename)
  }

  getCartById = async (cid) => this.getById(cid)

  addCart = async (products) => this.add({ products: products || [] })

  updateCartProducts = async (cid, products) => {
    const result = await this.update(cid, { products })
    result.modifiedCount = 1
    return result
  }

  updateProductFromCart = async (pid, cid, quantity = 1) => {
    const cart = await this.getCartById(cid)
    const productIndex = cart.products.findIndex((product) => product.id === parseInt(pid))
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity
      const result = await this.update(cid, { products: cart.products })
      result.modifiedCount = 1
      return result
    }
    cart.products.push({ id: parseInt(pid), quantity })
    const result = await this.update(cid, { products: cart.products })
    result.modifiedCount = 1
    return result
  }

  deleteCartProducts = async (cid) => {
    const result = await this.update(cid, { products: [] })
    result.modifiedCount = 1
    return result
  }

  deleteProductFromCart = async (cid, pid) => {
    const cart = await this.getById(cid)
    const productIndex = await cart.products.findIndex(product => product.id === parseInt(pid))
    if (productIndex !== -1) {
      cart?.products?.splice(productIndex, 1)
      const result = await this.update(cid, { products: cart.products })
      result.modifiedCount = 1
      return result
    }
    return { error: "Not found" }
  }
}