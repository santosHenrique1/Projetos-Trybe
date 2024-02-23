import { Request, Response } from 'express';
import userServices from '../service/user.services';

const getUserProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const usersAndProducts = await userServices.findAll();
    res.status(200).json(usersAndProducts);
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUserProducts,
};