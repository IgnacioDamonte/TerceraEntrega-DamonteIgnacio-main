import FileManager from "./file.manager.js"

export default class Products extends FileManager {
  constructor(filename = "./src/databases/db.products.json") {
    super(filename)
  }

  getProducts = async (a, b) => {
    const result = await this.get()
    return { docs: result }
  }

  getProductById = async (pid) => this.getById(parseInt(pid))

  getProductByFilter = async (filter) => {
    const { docs: products } = await this.getProducts()
    const product = products.find(product => product.code == filter.code)
    return product
  }

  addProduct = async (product) => this.add(product)

  updateProduct = async (pid, fields) => {
    const product = await this.getProductById(pid)
    return this.update(pid, { ...product, ...fields })
  }

  deleteProduct = async (pid) => this.delete(pid)
}