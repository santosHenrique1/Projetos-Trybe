const sinon = require('sinon');
const chai = require('chai');
const { mockAllSales, mockSales, mockResponseAllSales, mockResponseSales } = require('../mock');
const { salesController } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');

const { expect } = chai;

describe('Sales controler', function () {
  it('Testando findAll', async function () {
    sinon.stub(salesServices, 'findAll').resolves(mockResponseAllSales);
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findAll(undefined, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllSales);
  });
  it('Testando findById', async function () {
    sinon.stub(salesServices, 'findById').resolves(mockResponseSales);
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findById({ params: { id: 1 } }, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSales);
  });
  afterEach(function () {
    sinon.restore();
  });
});