const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { mockAllSales, mockSales } = require('../mock');
const { salesModels } = require('../../../src/models');

describe('sales test', function () {
  it('Testando a findAll', async function () {
    sinon.stub(connection, 'execute').resolves([mockAllSales]);
    const result = await salesModels.findAll();
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(mockAllSales); 
  });
  it('Testando a findById', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);
    const result = await salesModels.findById(1);
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(mockSales); 
  });
  it('Testando a create Sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModels.newSale(['produto1', 'produto2']);
    expect(result).to.be.an('number');
    expect(result).to.be.deep.equal(3);
  });

  afterEach(function () {
    sinon.restore();
  });
});
