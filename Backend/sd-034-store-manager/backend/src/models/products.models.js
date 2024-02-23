const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};
const findById = async (id) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [id],
  );
  console.log(products);
  return products;
};
const createProducts = async (nameProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [nameProduct],
  );
  return insertId;
};
const updateProducts = async (id, name) => {
  const [product] = await connection.execute(
    'UPDATE products SET name=? WHERE id=?',
    [name, id],
  );
  return product;
};
const deleteProducts = async (id) => {
  const [product] = await connection.execute(
    'DELETE FROM products WHERE id=?',
    [id],
  );
  return product;
};
module.exports = { 
  findAll, 
  findById,
  createProducts,
  updateProducts,
  deleteProducts,
};