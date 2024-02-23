const { salesServices } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesServices.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};
const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};
const createSale = async (req, res) => {
  const sale = req.body;
  const { status, data } = await salesServices.createSale(sale);
  return res.status(mapStatusHTTP(status)).json(data);
};
module.exports = {
  findAll,
  findById,
  createSale,
};