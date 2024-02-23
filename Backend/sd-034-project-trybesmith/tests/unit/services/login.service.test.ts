import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/loginMock';
import loginServices from '../../../src/service/login.services';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao não receber um e-mail, retorne um erro', async function () {
   const params = loginMock.nousernameLoginBody;
   const response = loginServices.getLogin(params);
   expect((await response).status).to.equal('UNAUTHORIZED');
  }

  );
  it('ao não receber uma senha, retorne um erro', async function () {
    const params = loginMock.noPasswordLoginBody;
    const response = loginServices.getLogin(params);
    expect((await response).status).to.equal('UNAUTHORIZED');
  });

});
