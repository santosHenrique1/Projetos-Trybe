module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 18 || !Number.isInteger(age)) {
    res.status(400);
    return res.json({ message: 
        'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};