import { Request, Response } from 'express';
import product from '../service/product.services';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, userId } = req.body;
  try {
    const newProduct = await product.createProduct({ name, price, userId });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};
const findAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await product.productList();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};
export default {
  createProduct,
  findAllProducts,
};