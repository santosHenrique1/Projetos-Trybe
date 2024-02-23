import { Product } from '../types/Product';
import ProductModel, 
{ ProductInputtableTypes } from '../database/models/product.model';

const createProduct = async (product: ProductInputtableTypes): Promise<Product> => {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
};
const productList = async (): Promise<Product[]> => {
  const findAll = await ProductModel.findAll();
  return findAll.map((product) => product.dataValues);
};
export default {
  createProduct,
  productList,
};