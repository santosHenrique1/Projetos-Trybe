const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { mockNewSales } = require('../mock');
const { validProductId, validQuantity } = require('../../../src/middlewares/saleMiddlewares');

const { expect } = chai;
chai.use(sinonChai);
describe('Sale Middleware', function () {
  it('Testar o id', async function () {
    const req = {
      body: mockNewSales,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validProductId(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Testar se não passar o productId vazio', async function () {
    const req = {
      body: [{
        quantity: 2,
      },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    validProductId(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('Testar se não passar o quantity vazio', async function () {
    const req = {
      body: [{
        productId: 2,
      },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    validQuantity(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Testar se não passar o quantity menor que 1', async function () {
    const req = {
      body: [{
        productId: 2,
        quantity: 0,
      },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    validQuantity(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(function () {
    sinon.restore();
  });
});