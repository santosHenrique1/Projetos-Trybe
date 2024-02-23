const { productsServices } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsServices.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};
const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};
const createProducts = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { status, data } = await productsServices.createProducts(name);
  return res.status(mapStatusHTTP(status)).json(data);
};
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsServices.updateProducts(Number(id), name);
  return res.status(mapStatusHTTP(status)).json(data);
};
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.deleteProducts(id);
  return res.status(mapStatusHTTP(status)).json(data);
};
module.exports = {
  findAll,
  findById,
  createProducts,
  updateProducts,
  deleteProducts,
};