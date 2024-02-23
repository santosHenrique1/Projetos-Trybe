const validProductId = async (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    const { productId } = body[i];
    if (!productId || productId === '') {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  next();
};
const validQuantity = async (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    const { quantity } = body[i];
    if (quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  next();       
};
module.exports = { validProductId, validQuantity };