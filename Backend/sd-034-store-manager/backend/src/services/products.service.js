const { productsModel } = require('../models');
const validate = require('./validation/validationInput');
 
const findAll = async () => { 
  const allProducts = await productsModel.findAll();
  return { status: 'SUCCESS', data: allProducts };
};
const findById = async (id) => {
  const productsId = await productsModel.findById(id);
  if (!productsId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESS', data: productsId };
};
const createProducts = async (nameProduct) => {
  const error = validate.validationNewProduct(nameProduct);
  if (error) {
    return {
      status: error.status,
      data: error.data,
    };
  }
  const productsCreate = await productsModel.createProducts(nameProduct);
  return { status: 'CREATED', data: { id: productsCreate, name: nameProduct } };
};
const updateProducts = async (id, nameProduct) => {
  const error = validate.validationNewProduct(nameProduct);
  if (error) {
    return {
      status: error.status,
      data: error.data,
    };
  }
  const productsId = await productsModel.findById(id);
  if (!productsId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productsModel.updateProducts(id, nameProduct);
  return { status: 'SUCCESS', data: { id, name: nameProduct } }; 
};
const deleteProducts = async (id) => {
  const productsId = await productsModel.findById(id);
  if (!productsId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  const del = await productsModel.deleteProducts(id);
  return { status: 'DELETE', data: del };
};
module.exports = {
  findAll,
  findById,
  createProducts,
  updateProducts,
  deleteProducts,
};