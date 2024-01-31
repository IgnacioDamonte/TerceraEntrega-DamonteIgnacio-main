export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async (queryFindParameters, optionsPaginate) => {
    const result = await this.dao.getProducts(
      queryFindParameters,
      optionsPaginate
    );
    return result;
  };

  getProductById = async (pid) => {
    const result = await this.dao.getProductById(pid);
    return result;
  };

  getProductByFilter = async (filter) => {
    const result = await this.dao.getProductByFilter(filter);
    return result;
  };

  checkProductProperties = ({
    title,
    description,
    price,
    stock,
    code,
    category,
  }) => {
    if (!title || !description || !price || !stock || !code || !category)
      return false;
    return true;
  };

  addProduct = async (product) => {
    const result = await this.dao.addProduct(product);
    return result;
  };

  updateProduct = async (pid, fields) => {
    const result = await this.dao.updateProduct(pid, fields);
    return result;
  };

  deleteProduct = async (pid) => {
    const result = await this.dao.deleteProduct(pid);
    return result;
  };
}
