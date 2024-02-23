const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
     FROM sales_products 
     INNER JOIN sales ON sales_products.sale_id = sales.id;`,
  );
  return sales;
};
const findById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
      FROM sales_products 
      INNER JOIN sales ON sales_products.sale_id = sales.id 
      WHERE id = ?`,
    [id],
  );
  return sales;
};
const createSale = async (id, products) => {
  if (products || products.length > 0) {
    const promisses = products.map(({ productId, quantity }) => 
      connection.execute(`INSERT INTO sales_products 
      (sale_id, product_id, quantity) 
      VALUES (?, ?, ?)`, [id, productId, quantity])); 
      
    await Promise.all(promisses);
  }
};
const newSale = async (products) => {
  const [{ insertId }] = await 
  connection.execute('INSERT INTO sales () VALUES()');
  await createSale(insertId, products);
  return insertId;
};
module.exports = { 
  findAll, 
  findById,
  newSale,
};