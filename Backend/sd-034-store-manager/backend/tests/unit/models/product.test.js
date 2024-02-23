const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { mockAllData, mockData, mockCratedProduct, mockUpdateProduct } = require('../mock');
const { productsModel } = require('../../../src/models');

describe('Product test', function () {
  it('Testando a get findAll', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllData]);
    const result = await productsModel.findAll();
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(mockAllData); 
  });
  it('Testando a get findById', async function () {
    sinon.stub(connection, 'execute').resolves([[mockData]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(mockData); 
  });
  it('Testando a Created', async function () {
    sinon.stub(productsModel, 'createProducts').resolves(mockCratedProduct);
    const result = await productsModel.createProducts('produto1');
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(mockCratedProduct); 
  });
  it('Testando a Update', async function () {
    sinon.stub(productsModel, 'updateProducts').resolves(mockUpdateProduct);
    const result = await productsModel.updateProducts(1);
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(mockUpdateProduct); 
  });
  it('Testando a Delete', async function () {
    sinon.stub(productsModel, 'deleteProducts').resolves();
    const result = await productsModel.deleteProducts(1);
    expect(result).to.be.an('undefined');
    expect(result).to.be.deep.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});
