import productModel from "./models/products.model.js"

export default class Products {
  constructor() { }

  getProducts = async (queryFindParameters, optionsPaginate) => {
    const result = await productModel.paginate(queryFindParameters, optionsPaginate)
    return result
  }

  getProductById = async (pid) => {
    const product = await productModel.findById(pid).lean().exec()
    return product
  }

  getProductByFilter = async (filter) => {
    const product = await productModel.findOne(filter).lean().exec()
    return product
  }

  addProduct = async (product) => {
    const result = await productModel.create(product)
    return result
  }

  updateProduct = async (pid, fields) => {
    const result = await productModel.updateOne({ _id: pid }, { $set: { ...fields } })
    return result
  }

  deleteProduct = async (pid) => {
    const result = await productModel.deleteOne({ _id: pid })
    return result
  }
}