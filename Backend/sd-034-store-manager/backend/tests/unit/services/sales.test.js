const sinon = require('sinon');
const { expect } = require('chai');
const { mockAllData, mockData } = require('../mock');
const { salesModels } = require('../../../src/models');
const { salesServices } = require('../../../src/services');

describe('Sales test', function () {
  it('Testando a findAll', async function () {
    sinon.stub(salesModels, 'findAll').resolves(mockAllData);
    const { status, data } = await salesServices.findAll();
    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.deep.equal(mockAllData); 
  });
  it('Testando a findById', async function () {
    sinon.stub(salesModels, 'findById').resolves(mockData);
    const { status, data } = await salesServices.findById(1);
    expect(status).to.be.equal('SUCCESS');
    expect(data).to.be.deep.equal(mockData); 
  });
  it('Testando a Create Sales', async function () {
    sinon.stub(salesModels, 'newSale').resolves(3);
    const values = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];
    const { status, data } = await salesServices.createSale(values);
    expect(status).to.be.equal('CREATED');
    expect(data).to.be.deep.equal({ id: 3, itemsSold: values }); 
  });
  afterEach(function () {
    sinon.restore();
  });
});