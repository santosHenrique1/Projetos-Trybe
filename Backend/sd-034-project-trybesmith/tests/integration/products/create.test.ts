import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import validateName from '../../../src/middleware/nameValidate';
import userIdValidate from '../../../src/middleware/userIdValidate';
import { Request, Response } from 'express';
chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('testa o middware de erro name', async function () {
    const req = {
      body: {
        name: 'Produto de teste',
        price: 10.0,
        userId: 1,
      }
    } as Request;
    const res = {} as Response;

    const next = sinon.stub();

    validateName.validateName(req, res, next);
    expect(next).to.have.been.called;

  });
it('testa o userId', async function () {
    const req = {
      body: {
        name: 'Produto de teste',
        price: 10.0,
        userId: 1,
      }
    } as Request;
    const res = {} as Response;

    const next = sinon.stub();

    userIdValidate.userIdValidate(req, res, next);
    expect(next).to.have.been.called;
});

});
