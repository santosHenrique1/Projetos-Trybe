const sinon = require('sinon');
const { expect } = require('chai');
const { mockAllData, mockData } = require('../mock');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');

describe('Product test', function () {
  it('Testando a findAll', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockAllData);
    const { status, data } = await productsServices.findAll();
    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.deep.equal(mockAllData); 
  });
  it('Testando a findById', async function () {
    sinon.stub(productsModel, 'findById').resolves(mockData);
    const { status, data } = await productsServices.findById(1);
    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.deep.equal(mockData); 
  });
  it('testando o deleteProducts caso de sucesso', async function () {
    sinon.stub(productsModel, 'deleteProducts').resolves();
    const { status, data } = await productsServices.deleteProducts(1);
    expect(status).to.be.equal('DELETE');
    expect(data).to.be.deep.equal(undefined);
  });
  it('testando deleteProducts caso de erro', async function () {
    sinon.stub(productsModel, 'deleteProducts').resolves(null);
    const { status, data } = await productsServices.deleteProducts(10);
    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});