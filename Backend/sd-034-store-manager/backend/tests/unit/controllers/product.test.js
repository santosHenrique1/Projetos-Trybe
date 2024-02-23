const sinon = require('sinon');
const chai = require('chai');
const { mockCratedProduct, mockResponse, mockProductResponseAll, mockAllData, mockData } = require('../mock');
const { productsController } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');

const { expect } = chai;

describe('Product controler', function () {
  it('Testando a validação do nome do produto', async function () {
    sinon.stub(productsServices, 'createProducts').resolves(mockCratedProduct);
    const req = {
      body: {
        name: 'produto1',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.createProducts(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });
  it('Testando findAll', async function () {
    sinon.stub(productsServices, 'findAll').resolves(mockProductResponseAll);
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.findAll(undefined, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockAllData);
  });
  it('Testando findById', async function () {
    sinon.stub(productsServices, 'findById').resolves(mockResponse);
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.findById({ params: { id: 1 } }, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockData);
  });
  it('testando o deleteProducts caso de sucesso', async function () {
    sinon.stub(productsServices, 'deleteProducts').resolves({
      status: 'DELETE',
    });
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.deleteProducts(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(undefined);
  });
  it('testando o deleteProducts caso de erro', async function () {
    sinon.stub(productsServices, 'deleteProducts').resolves({
      status: 'NOT_FOUND',
    });
    const req = {
      params: {
        id: 4,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.deleteProducts(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });  
  afterEach(function () {
    sinon.restore();
  });
});