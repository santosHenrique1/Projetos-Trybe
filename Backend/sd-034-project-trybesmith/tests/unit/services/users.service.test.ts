import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import ProductModel from '../../../src/database/models/product.model';
import userServices from '../../../src/service/user.services';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('lista de usuários', async function () {
    const users: any = [
      {
        dataValues: {
          id: 1,
          username: 'user1',
        },
      }
    ];
    const products: any = [ 
      {
        dataValues: {
          id: 1,
          name: 'Produto de teste',
          price: 10.0,
          userId: 1,
        },
      }, 
    ];
    const allFunction = sinon.stub(UserModel, 'findAll').resolves(users);
    sinon.stub(ProductModel, 'findAll').resolves(products);
    await userServices.findAll();
    expect(allFunction.calledOnce).to.be.true;
});

});
