export default class CartsService {
  constructor(dao) {
    this.dao = dao;
  }

  getCartById = async (cid) => {
    const cart = await this.dao.getCartById(cid)
    return cart;
  };

  addCart = async (products) => {
    const cart = await this.dao.addCart(products)
    return cart;
  };

  updateCartProducts = async (cid, products) => {
    const result = await this.dao.updateCartProducts(cid, products)
    return result;
  };

  updateProductFromCart = async (pid, cid, quantity) => {
    const result = await this.dao.updateProductFromCart(pid, cid, quantity)
    return result;
  };

  deleteCartProducts = async (cid) => {
    const result = await this.dao.deleteCartProducts(cid)
    return result;
  };

  deleteProductFromCart = async (cid, pid) => {
    const result = await this.dao.deleteProductFromCart(cid, pid)
    return result;
  };
}
