import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/loginMock';

chai.use(chaiHttp);
describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('ao não receber um e-mail, retorne um erro', async function () {
    const httpRequestBody = loginMock.nousernameLoginBody
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required'});
});

  it('ao não receber uma senha, retorne um erro', async function () {

    const httpRequestBody = loginMock.noPasswordLoginBody

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  });
  it('usuario invalida', async function () {
    
    const httpRequestBody = loginMock.invalidUsername;
    sinon.stub(UserModel, 'findOne').resolves(null);
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });

    
   });

});
