import { UserProduct } from '../types/UserProduct';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

const findAll = async (): Promise<UserProduct[]> => {
  const findAllUsers = await UserModel.findAll();
  const findAllProducts = await ProductModel.findAll();

  const result = findAllUsers.map((user) => {
    const productIds = findAllProducts
      .filter((product) => product.dataValues.userId === user.dataValues.id)
      .map((product) => product.dataValues.id);
    return {
      username: user.dataValues.username,
      productIds,
    };
  });
  return result;
};

export default {
  findAll,
};
