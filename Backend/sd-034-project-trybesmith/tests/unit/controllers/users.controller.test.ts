import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UsersController from '../../../src/controller/user.controller';
import userServices from '../../../src/service/user.services';
chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('listar usuários', async function () {
    const users = [{
      username: 'user1',
      productsIds: [1, 2],
    }];
    sinon.stub(userServices, 'findAll').resolves(users);
    await UsersController.getUserProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users);
  });

});
