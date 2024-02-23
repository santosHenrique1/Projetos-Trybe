const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { existName } = require('../../../src/middlewares/productMiddlewares');

const { expect } = chai;
chai.use(sinonChai);
describe('existName test', function () {
  it('Valida se funciona a função', async function () {
    const req = {
      body: { name: 'martelo' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    existName(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('Valida se o status é 400 quando o name é vazio', async function () {
    const req = {
      body: { name: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    existName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
  });
  it('Valida se o status é 400 quando o name é undefined', async function () {  
    const req = {
      body: { name: undefined },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    existName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
  });
  afterEach(function () {
    sinon.restore();
  });
});