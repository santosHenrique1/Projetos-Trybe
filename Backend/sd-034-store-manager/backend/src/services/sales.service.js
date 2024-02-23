const { salesModels } = require('../models');

const findAll = async () => { 
  const allSalles = await salesModels.findAll();
  return { status: 'SUCCESS', data: allSalles };
};
const findById = async (id) => {
  const salesId = await salesModels.findById(id);
  if (!salesId || salesId.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESS', data: salesId };
};
const createSale = async (insertSale) => {
  try {
    const newSale = await salesModels.newSale(insertSale);
    return { status: 'CREATED', data: { id: newSale, itemsSold: insertSale } };
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
};
module.exports = {
  findAll,
  findById,
  createSale,
};