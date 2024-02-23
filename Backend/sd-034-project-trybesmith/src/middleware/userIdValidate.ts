import { RequestHandler } from 'express';
import ProductModel from '../database/models/product.model';

const userIdValidate: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ message: '"userId" is required' });
    }
    if (typeof userId !== 'number') {
      return res.status(422).json({ message: '"userId" must be a number' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
const userIdExist: RequestHandler = async (req, res, next) => {
  try {
    const product = await ProductModel.findOne({ where: { userId: req.body.userId } });
    const userId = product?.dataValues.userId;
  
    if (userId !== req.body.userId) {
      return res.status(422).json({ message: '"userId" not found' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
export default { userIdValidate, userIdExist };