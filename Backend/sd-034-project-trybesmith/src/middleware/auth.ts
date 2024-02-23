import { RequestHandler } from 'express';

const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: '"username" and "password" are required' });
    }
  } catch (error) {
    console.log(error);
  }

  next();
};
export default { createUser };
