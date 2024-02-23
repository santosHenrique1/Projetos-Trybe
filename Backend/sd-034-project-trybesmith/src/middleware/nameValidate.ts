import { RequestHandler } from 'express';

const validateName: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
const validateName2: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (typeof name !== 'string') {
      return res.status(422).json({ message: '"name" must be a string' });
    }
    if (name.length < 3) {
      return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
export default { validateName, validateName2 };